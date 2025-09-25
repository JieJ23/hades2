export default function Background() {
  return (
    <div className="fixed w-full h-lvh -z-10 pointer-events-none">
      <div className="w-full h-full bg-[url('/Misc/family2.webp')] bg-top bg-cover" />
      {/* <div className="absolute top-0 w-full h-full bg-gradient-to-t to-[#000000e4] from-[#000000f3] pointer-events-none" /> */}
    </div>
  );
}
