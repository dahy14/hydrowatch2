import Dashboard from "./pages/Admin/Dashboard";
import Valve from "./pages/Admin/Valve";
import Rate from "./pages/Admin/Rate";
import Navbar from "./components/Admin/Navbar";
import Sidebar from "./components/Admin/Sidebar";
import ThemeContextProvider from "./context/ThemeContextProvider";
function App() {
  return (
    <ThemeContextProvider>
      <div className="flex">
        <Sidebar />
        <div
          className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-900 dark:text-white"
        >
          <Navbar />
          <div>
            <Dashboard />
          </div>
          <div>
            <Valve />
          </div>
          <div>
            <Rate />
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
}
export default App;
