import { Link } from "react-router";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import appLogo from "../../assets/logo.png";

const Header = () => {
    return (
        <header className="absolute z-1 my-[1rem] w-[calc(100vw-32px)] h-[2.5rem] flex flex-row justify-between items-center">
            <Link to={"/"} className="h-full flex items-center">
                <img
                    className="h-[2rem] w-auto"
                    src={appLogo}
                    alt="cherrybloom-logo"
                />
            </Link>
            <SearchBar />
            <Navbar />
        </header>
    );
};

export default Header;
