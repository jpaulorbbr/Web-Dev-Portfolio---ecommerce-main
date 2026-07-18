import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
    return (
        <div>
            <Sidebar />

            <div className="admin-content">
                <Topbar />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}