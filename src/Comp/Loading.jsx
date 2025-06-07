export default function Loading() {
  return (
    <div className="flex justify-center items-center gap-2 font-[PT] mt-10">
      <span className="loading loading-infinity loading-lg"></span>
      <div>Fetching...</div>
    </div>
  );
}
