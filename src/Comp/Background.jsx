export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10 pointer-events-none">
      <div className="w-full h-full bg-[url('/hadestwo.webp')] bg-top bg-cover" />
      <div className="absolute bottom-0 w-full h-full bg-linear-to-t from-black via-black/70 to-black/50" />
    </div>
  );
}
