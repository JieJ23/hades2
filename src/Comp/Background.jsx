export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/mbg.webp')] bg-top bg-cover opacity-20"></div>
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}
