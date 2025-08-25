export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10">
      <div className="w-full h-full bg-[url('/Misc/mel1.webp')] bg-top bg-cover opacity-60" />
      <div className="absolute bottom-0 w-full h-4/5 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </div>
  );
}
