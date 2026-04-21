export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10 pointer-events-none ">
      <div className="absolute w-full h-full bg-[url('/melinoe.webp')] bg-top bg-cover -z-10" />
      <div className="absolute bottom-0 w-full h-full bg-black/85 z-40" />
    </div>
  );
}
