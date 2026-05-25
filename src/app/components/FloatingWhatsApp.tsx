export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918187882772"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-lg transition-all flex items-center justify-center hover:scale-110 active:scale-95 group border-2 border-white"
      aria-label="Contact on WhatsApp"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.98C16.584 1.895 14.11 1.87 11.83 1.872 6.394 1.875 1.968 6.29 1.965 11.737c-.001 1.706.46 3.376 1.332 4.836l-.991 3.618 3.751-.983zm11.566-6.175c-.247-.123-1.464-.722-1.692-.805-.226-.083-.393-.123-.559.123-.166.247-.643.805-.788.97-.145.166-.29.186-.537.063-.247-.123-1.042-.384-1.986-1.227-.735-.656-1.231-1.465-1.375-1.712-.145-.247-.015-.38.109-.502.112-.11.247-.29.37-.435.123-.145.166-.247.247-.413.083-.166.042-.31-.021-.435-.063-.123-.559-1.348-.766-1.848-.201-.484-.406-.418-.559-.426-.145-.008-.31-.01-.476-.01-.166 0-.435.063-.663.31-.228.247-.87.85-.87 2.07 0 1.22.885 2.4 1.01 2.565.125.165 1.74 2.657 4.215 3.727.59.254 1.05.405 1.41.519.59.188 1.13.16 1.55.097.47-.07 1.46-.597 1.67-1.175.207-.577.207-1.074.145-1.175-.062-.1-.227-.165-.474-.29z" />
      </svg>
      <span className="absolute left-14 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-lg opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
        Chat with US
      </span>
    </a>
  );
}
