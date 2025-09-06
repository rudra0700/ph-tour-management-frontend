import { Outlet } from "react-router";


const AdminLayout = () => {
    return (
        <div>
            <h1>From admin layout</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayout;