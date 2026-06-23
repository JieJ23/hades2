import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";
import Discord from "./Discord";

export default function PageBlock({ children }) {
  return (
    <div>
      <Background />
      <SideNav />
      <div className="min-h-screen rounded max-w-400 mx-auto px-2 font-[Ubuntu] text-[13px]">{children}</div>
      <Discord />
      <Footer />
    </div>
  );
}
