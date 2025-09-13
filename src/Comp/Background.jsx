export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/Misc/v1.webp')] bg-top bg-cover opacity-40" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-b to-[#131111] from-[#131111b1] pointer-events-none" />
    </div>
  );
}
