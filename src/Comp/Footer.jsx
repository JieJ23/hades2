export default function Footer() {
  return (
    <div className="my-10 select-none text-gray-300 font-[Spec] text-center text-[13px] md:text-[14px] px-2">
      <div className="text-[12px]">Managing Members:</div>
      <div className="text-green-300">Aki | Frei | Vangetsu | Andrw</div>
      <div className="avatar-group -space-x-4 flex justify-center my-1">
        <div className="avatar border-[1px] border-transparent">
          <img src="/Avatar/aki.webp" alt="Member" className="size-10 md:size-12 mask mask-decagon" />
        </div>
        <div className="avatar border-[1px] border-transparent">
          <img src="/Avatar/frei.webp" alt="Member" className="size-10 md:size-12 mask mask-decagon" />
        </div>
        <div className="avatar border-[1px] border-transparent">
          <img src="/Avatar/vangetsu.webp" alt="Member" className="size-10 md:size-12 mask mask-decagon" />
        </div>
        <div className="avatar border-[1px] border-transparent">
          <img src="/Avatar/andrw.webp" alt="Member" className="size-10 md:size-12 mask mask-decagon" />
        </div>
      </div>
      <div className="text-[12px]">Website has no affiliation with Supergiant Games</div>
    </div>
  );
}
