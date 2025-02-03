import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./context/useAuth";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <UserProvider>
        <ToastContainer />
        <Outlet />
      </UserProvider>
    </>
  );
};

export default App;