export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/Misc/mel1.webp')] bg-top bg-cover opacity-40" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b to-[#000000] from-[#000000b1] pointer-events-none" />
    </div>
  );
}
