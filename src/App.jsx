import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";

function App() {
  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-2">
        <SideNav />
        <div className="w-full"></div>
      </div>
    </main>
  );
}

export default App;
