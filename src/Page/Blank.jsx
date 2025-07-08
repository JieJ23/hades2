import Head from "../Comp/Head";
import SideNav from "../Comp/Sidebar";
import Background from "../Comp/Background";

export default function Blank() {
  return (
    <main className="h-full min-h-lvh select-none relative">
      <Background />
      <Head />
      <SideNav />
    </main>
  );
}
