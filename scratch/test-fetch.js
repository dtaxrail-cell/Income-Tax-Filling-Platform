import http from 'http';

http.get('http://localhost:5174/', (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Response head (100 chars):', data.substring(0, 100));
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err.message);
});
