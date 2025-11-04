import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

export default function MyRun() {
  return (
    <main className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <div className="max-w-[1200px] font-[Ale] text-[14px] mx-auto px-1">
        <SideNav />
      </div>
      <Footer />
    </main>
  );
}
