import { Outlet } from "react-router";
import "./App.css";
import ComomonLayout from "./components/layout/ComomonLayout";

function App() {
  return (
   <ComomonLayout>
     <Outlet></Outlet>
   </ComomonLayout>
  );
}

export default App;
