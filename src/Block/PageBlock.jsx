import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

export default function PageBlock({ children }) {
  return (
    <div>
      <Background />
      <SideNav />
      <div className="min-h-screen rounded max-w-350 mx-auto px-2 font-[Ale] text-[13px] md:text-[14px]">
        {children}
      </div>
      <Footer />
    </div>
  );
}
