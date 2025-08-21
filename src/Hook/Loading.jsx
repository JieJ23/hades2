export default function Loading() {
  return (
    <div className="flex justify-center items-center gap-2 mt-10 font-[Cinzel]">
      <span className="loading loading-ring loading-lg" />
      <div className="text-white text-[18px] uppercase">Fetching Entries</div>
    </div>
  );
}
