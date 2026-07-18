import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside>
            <h2>Admin</h2>

            <nav>
                <NavLink to="">Dashboard</NavLink>
                <NavLink to="products">Products</NavLink>
                <NavLink to="users">Users</NavLink>
                <NavLink to="staff">Staff</NavLink>
                <NavLink to="profile">Profile</NavLink>
            </nav>
        </aside>
    )
}