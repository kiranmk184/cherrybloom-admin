import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/useAuth";
import { Outlet } from "react-router";
import ErrorBoundary from "./utils/helpers/ErrorBoundary";
import { ThemeProvider } from "./ThemeProvider";

const App = () => {
    return (
        <>
            <ErrorBoundary>
                <ThemeProvider>
                    <UserProvider>
                        <ToastContainer />
                        <Outlet />
                    </UserProvider>
                </ThemeProvider>
            </ErrorBoundary>
        </>
    );
};

export default App;
