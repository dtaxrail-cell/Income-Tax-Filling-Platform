import { spawn } from 'child_process';
import http from 'http';
import WebSocket from 'ws';

// 1. Launch Chrome in headless mode with remote debugging port 9222
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  'http://localhost:5174/'
]);

chrome.on('error', (err) => {
  console.error('Failed to start Chrome:', err);
  process.exit(1);
});

// Wait 2 seconds for Chrome to start, then query CDP targets
setTimeout(() => {
  http.get('http://localhost:9222/json/list', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      try {
        const targets = JSON.parse(data);
        const target = targets.find(t => t.url.includes('localhost:5174') || t.type === 'page');
        if (!target) {
          console.error('No active Chrome tab target found for localhost:5174.');
          chrome.kill();
          process.exit(1);
        }
        
        console.log('Connecting to Chrome Target WebSocket:', target.webSocketDebuggerUrl);
        connectCDP(target.webSocketDebuggerUrl);
      } catch (err) {
        console.error('Error parsing targets:', err);
        chrome.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Error querying CDP targets:', err.message);
    chrome.kill();
    process.exit(1);
  });
}, 2000);

function connectCDP(wsUrl) {
  const ws = new WebSocket(wsUrl);
  
  ws.on('open', () => {
    console.log('CDP connection opened. Enabling runtime and console logs...');
    // Enable Runtime and Console
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Console.enable' }));
  });

  ws.on('message', (message) => {
    const event = JSON.parse(message);
    
    // Log console API calls
    if (event.method === 'Runtime.consoleAPICalled') {
      const args = event.params.args.map(arg => arg.value || JSON.stringify(arg)).join(' ');
      console.log(`[BROWSER CONSOLE - ${event.params.type}]:`, args);
    }
    
    // Log unhandled exceptions
    if (event.method === 'Runtime.exceptionThrown') {
      console.error('[BROWSER EXCEPTION]:', JSON.stringify(event.params.exceptionDetails, null, 2));
    }
    
    // Log standard console messages
    if (event.method === 'Console.messageAdded') {
      console.log('[BROWSER CONSOLE MESSAGE]:', event.params.message.text);
    }
  });

  ws.on('error', (err) => {
    console.error('CDP WebSocket error:', err);
  });

  // Let the browser load and log for 5 seconds, then wrap up
  setTimeout(() => {
    console.log('Finished capturing browser logs. Exiting...');
    ws.close();
    chrome.kill();
    process.exit(0);
  }, 5000);
}
