import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Order from "../pages/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import Product from "../pages/Product";
import Channel from "../pages/Channel";
import Category from "../pages/category/Category";
import Inventory from "../pages/Inventory";
import CategoryFormProvider from "../pages/category/components/CategoryFormProvider";
import AuthRoute from "./AuthRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "",
                element: (
                    <AuthRoute>
                        <DashboardLayout />
                    </AuthRoute>
                ),
                children: [
                    {
                        path: "",
                        element: <Dashboard />,
                    },
                    {
                        path: "category",
                        children: [
                            {
                                path: ":categoryId?",
                                element: <Category />,
                            },
                            {
                                path: "create",
                                element: <CategoryFormProvider />,
                            },
                        ],
                    },
                    {
                        path: "order",
                        element: <Order />,
                        children: [{ path: ":orderId", element: <Order /> }],
                    },
                    {
                        path: "channel",
                        element: <Channel />,
                        children: [
                            { path: ":channelId", element: <Channel /> },
                        ],
                    },
                    {
                        path: "product",
                        element: <Product />,
                        children: [
                            { path: ":productId", element: <Product /> },
                        ],
                    },
                    {
                        path: "inventory",
                        element: <Inventory />,
                        children: [
                            { path: ":inventoryId", element: <Inventory /> },
                        ],
                    },
                ],
            },
        ],
    },
]);
