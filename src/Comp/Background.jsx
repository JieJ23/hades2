export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10 pointer-events-none ">
      <div className="absolute w-full h-full bg-[url('/home.webp')] bg-center bg-cover -z-10" />
      <div className="absolute bottom-0 w-full h-[50vh] bg-linear-to-t from-[#0e0c12]/90 to-transparent z-40" />
      <div className="absolute top-0 w-full h-[50vh] bg-linear-to-b from-[#0e0c12]/90 to-transparent z-40" />
    </div>
  );
}
