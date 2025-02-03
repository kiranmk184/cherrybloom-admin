import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { UserProfile } from "../models/User";

const Profile = () => {
    const { user } = useAuth();
    const [visible, setVisible] = useState<Boolean>(false);

    return (
        <>
            <button onClick={() => setVisible(!visible)} id="dropdownAvatar" className="h-[2rem] w-[3rem] text-white bg-primary-75 hover:bg-primary transition-colors ease-out rounded-full">
                <img src="" alt="PA" className="" />
            </button>

            <div id="profileDropdown" className={`${visible ? 'block' : 'hidden'} bg-black absolute right-[.5rem] top-[3rem] w-auto z-10 divide-y divide-gray-100 border-1 border-white-75 rounded-md shadow`}>
                <div className="p-2">
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-white-75">{user?.email}</p>
                </div>
                <ul className="p-2 text-white-75">
                    <li className="">
                        <a href="" className="block p-2 hover:bg-white-25 rounded-md">Profile</a>
                    </li>
                    <li>
                        <a href="" className="block p-2 hover:bg-white-25 rounded-md">Policies</a>
                    </li>
                    <li>
                        <a href="" className="block p-2 hover:bg-white-25 rounded-md">Settings</a>
                    </li>
                </ul>
                <div className="p-2">
                    <a href="" className="block p-2 text-white-75 hover:bg-white-25 rounded-md">Sign Out</a>
                </div>
            </div>
        </>
    );
}

export default Profile;