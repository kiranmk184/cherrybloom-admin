import Profile from "./Profile";
import Add from "./Add";
import Notification from "./Notification";
import ThemeSwitch from "./ThemeSwitch";

const Menu = () => {
    return (
        <div className="flex gap-[1rem]">
            <ThemeSwitch />
            <Notification />
            <Profile />
            <Add />
        </div>
    );
};

export default Menu;
