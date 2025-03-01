import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { UserProfile } from "../../models/User";
import { getAbbreviation } from "../../utils/helpers/stringhelper";

const Profile = () => {
    const { user } = useAuth();
    const [visible, setVisible] = useState<Boolean>(false);

    return (
        <>
            <button
                onClick={() => setVisible(!visible)}
                id="dropdownAvatar"
                className="px-[.5rem] h-[1.875rem] bg-app-content-15 hover:bg-app-content-25 text-app-content transition-colors ease-out rounded-[.5rem] flex justify-center items-center"
            >
                <span className="h-[1.875rem]">
                    <h5>{getAbbreviation(user?.name)}</h5>
                </span>
                <span className="material-symbols-rounded text-app-content">
                    keyboard_arrow_down
                </span>
            </button>

            <div
                id="profileDropdown"
                className={`${
                    visible ? "block" : "hidden"
                } bg-app-bg absolute right-[.5rem] top-[3rem] w-auto z-10 divide-y divide-app-content-50 border-1 border-app-content-25 rounded-[.5rem] shadow-xl shadow-app-content-25`}
            >
                <div className="p-2">
                    <p className="font-semibold text-app-content">
                        {user?.name}
                    </p>
                    <p className="text-app-content-75">{user?.email}</p>
                </div>
                <ul className="p-2 text-app-content-75">
                    <li className="">
                        <a
                            href=""
                            className="block px-4 py-1 hover:bg-app-content-25 rounded-md"
                        >
                            Profile
                        </a>
                    </li>
                    <li>
                        <a
                            href=""
                            className="block px-4 py-1 hover:bg-app-content-25 rounded-md"
                        >
                            Policies
                        </a>
                    </li>
                    <li>
                        <a
                            href=""
                            className="block px-4 py-1 hover:bg-app-content-25 rounded-md"
                        >
                            Settings
                        </a>
                    </li>
                </ul>
                <div className="p-2">
                    <a
                        href=""
                        className="block px-4 py-1 text-app-content-75 hover:bg-app-content-25 rounded-md"
                    >
                        Sign Out
                    </a>
                </div>
            </div>
        </>
    );
};

export default Profile;
