import { Outlet } from "react-router";
import "./App.css";
import ComomonLayout from "./components/layout/ComomonLayout";

import { adminSidebarItem } from "./routes/adminSidebarItems";
import { generateRoutes } from "./utils/generateRoutes";

function App() {
  console.log(generateRoutes(adminSidebarItem));
  return (
   <ComomonLayout>
     <Outlet></Outlet>
   </ComomonLayout>
  );
}

export default App;
