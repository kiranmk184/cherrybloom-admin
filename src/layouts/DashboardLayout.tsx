import Header from "../components/header/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { Outlet } from "react-router";
import { useState } from "react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <Header />
            <Sidebar expanded={isSidebarOpen} setExpanded={setIsSidebarOpen} />
            <Main isSidebarOpen={isSidebarOpen}>
                <Outlet />
            </Main>
        </>
    );
};

export default DashboardLayout;
