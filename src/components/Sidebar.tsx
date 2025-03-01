import appLogo from "../assets/logo.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link, NavLink } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ children, expanded, setExpanded }: any) => {
    return (
        <>
            {/* 
                This div is used to create the background overlay when the sidebar is expanded
                It is only visible on mobile screens
            */}
            <div
                className={`fixed inset-0 -z-10 block bg-gray-400  ${
                    expanded ? "block sm:hidden" : "hidden"
                }`}
            />
            <aside
                className={`absolute box-border ${
                    expanded
                        ? "sm:w-[16rem] h-full"
                        : "mt-[4.5rem] w-0 sm:w-[2.5rem] h-[calc(100vh-144px)]"
                }`}
            >
                <nav className="flex h-full flex-col border-r border-app-content-25">
                    <div
                        className={`mx-[1rem] ${
                            expanded
                                ? "mt-[4.5rem]"
                                : "mt-0 ml-0 justify-center"
                        } flex items-center justify-between`}
                    >
                        <span
                            className={`text-sm text-app-content-75 overflow-hidden ${
                                expanded ? "w-auto" : "w-0 hidden"
                            }`}
                        >
                            Main
                        </span>
                        <div className={`${expanded ? "" : "hidden sm:block"}`}>
                            <button
                                onClick={() =>
                                    setExpanded((curr: boolean) => !curr)
                                }
                                className="cursor-pointer rounded-lg text-app-content-75 hover:bg-app-content-15 hover:text-app-content"
                            >
                                {expanded ? (
                                    <ChevronLeftIcon className="h-[2rem] w-[2rem]" />
                                ) : (
                                    <ChevronRightIcon className="h-[2rem] w-[2rem]" />
                                )}
                            </button>
                        </div>
                    </div>
                    <ul
                        className={`${
                            expanded ? "mx-[1rem]" : "mr-[1rem]"
                        } flex-1`}
                    >
                        {children}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default function MakeSidebar({
    expanded,
    setExpanded,
}: {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const navBarItems = [
        {
            icon: <DashboardIcon />,
            text: "Dashboard",
            to: "/",
        },
        {
            icon: <ReceiptIcon />,
            text: "Order",
            to: "/order",
        },
        {
            icon: <CategoryIcon />,
            text: "Category",
            to: "/category",
        },
        {
            icon: <StoreIcon />,
            text: "Channel",
            to: "/channel",
        },
        {
            icon: <ContentPasteIcon />,
            text: "Product",
            to: "/product",
        },
        {
            icon: <InventoryIcon />,
            text: "Inventory",
            to: "/inventory",
        },
    ];

    // Desktop Sidebar
    return (
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
            {navBarItems.map((item, index) => (
                <SidebarItem key={index} expanded={expanded} {...item} />
            ))}
        </Sidebar>
    );
}
