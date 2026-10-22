import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";
import Footer from "../Comp/Footer";

export default function PageBlock({ children }) {
  return (
    <div>
      <Background />
      <SideNav />
      <div className="max-w-400 mx-auto font-[Aleo] text-[14px] relative">{children}</div>
      <Footer />
    </div>
  );
}
