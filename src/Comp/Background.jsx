export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/Misc/map.webp')] bg-top bg-cover opacity-50" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-tr to-[#0000002d] via-[#000000b9] from-[#000000a5] pointer-events-none" />
    </div>
  );
}
