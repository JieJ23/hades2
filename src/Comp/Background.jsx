export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/Misc/map.webp')] bg-top bg-cover opacity-50" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b to-[#000000b2] via-[#000000b9] from-[#000000b2] pointer-events-none" />
    </div>
  );
}
