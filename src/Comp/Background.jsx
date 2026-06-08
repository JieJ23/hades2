export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10 pointer-events-none ">
      <div className="absolute w-full h-full bg-[url('/bio.webp')] bg-center bg-cover -z-10" />
      <div className="absolute bottom-0 w-full h-[50vh] bg-linear-to-t from-black/95 via-black/85 to-black/70 z-40" />
      <div className="absolute top-0 w-full h-[50vh] bg-linear-to-b from-black/95 via-black/85 to-black/70 z-40" />
    </div>
  );
}
