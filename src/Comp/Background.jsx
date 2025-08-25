export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/Misc/mel1.webp')] bg-top bg-cover opacity-60" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b to-[#131111] from-[#1311114d] pointer-events-none" />
    </div>
  );
}
