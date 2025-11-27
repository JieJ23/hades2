import Background from "../Comp/Background";
import SideNav from "../Comp/Sidebar";
import Footer from "../Comp/Footer";

export default function Service() {
  return (
    <div className="h-full min-h-lvh relative overflow-hidden">
      <Background />
      <SideNav />
      <div className="text-[20px] text-center my-10 font-[Ale] px-4">
        <div>Currently under maintenance. Please check back another time.</div>
        <div>Shareable tools are still available for use.</div>
      </div>
      <Footer />
    </div>
  );
}
