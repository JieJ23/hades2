export default function Loading() {
  return (
    <div className="flex justify-center items-center gap-2 font-[PT] mt-10">
      <span className="loading loading-spinner loading-lg" />
      <div>Loading Data</div>
    </div>
  );
}
