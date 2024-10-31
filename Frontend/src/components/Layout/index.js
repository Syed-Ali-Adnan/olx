import { Outlet } from "react-router-dom";
//import Header from "../Header";
//<Header/>
const LayoutWrapper = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LayoutWrapper;
