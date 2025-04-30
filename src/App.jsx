import Head from "./Comp/Head";
import SideNav from "./Comp/Sidebar";

function App() {
  return (
    <main className="h-full min-h-lvh">
      <Head />
      <div className="flex flex-col md:flex-row gap-1">
        <SideNav />
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center"></div>
        </div>
        <div className="w-[250px] shrink-0 hidden lg:block"></div>
      </div>
    </main>
  );
}

export default App;
