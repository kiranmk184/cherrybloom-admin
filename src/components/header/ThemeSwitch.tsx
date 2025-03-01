import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useState } from "react";
import { ColorScheme, ThemeMode, useTheme } from "../../ThemeProvider";
import { Dropdown } from "../Dropdown";

type Theme = "light" | "dark" | "system";

const ThemeSwitch = () => {
    const { themeMode, setThemeMode, colorScheme, setColorScheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState<Theme>("system");

    const themeItems = [
        {
            value: "light",
            label: "Light Mode",
            iconOnly: true,
            icon: <WbSunnyIcon sx={{ width: '2rem', height: '2rem'}} />,
        },
        {
            value: "dark",
            label: "Dark Mode",
            iconOnly: true,
            icon: <DarkModeIcon sx={{ width: '2rem', height: '2rem'}} />,
        },
        {
            value: "system",
            label: "System",
            iconOnly: true,
            icon: <ContrastIcon sx={{ width: '2rem', height: '2rem'}} />,
        },
    ];

    const handleThemeChange = (theme: Theme) => {
        setSelectedTheme(theme);
        const shouldBeDark = theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
        setThemeMode(shouldBeDark);
        document.documentElement.setAttribute(
            "data-theme",
            shouldBeDark ? "dark" : "light"
        );
    };

    return (
        <>
            <Dropdown<Theme>
                items={themeItems}
                selectedValue={selectedTheme}
                onSelect={handleThemeChange}
                className="w-full"
                menuClassName="w-auto"
                triggerClassName="rounded-full"
            />

            {/* <button type="button">
                <DarkModeIcon sx={{ width: "2rem", height: "2rem" }} />
            </button> */}

            {/* <ul className="divide-y divide-app-content-25 border-1 border-app-content-25 rounded-[.5rem] shadow-md shadow-app-content-15">
                <li className="px-4 py-2 text-app-content hover:bg-app-content-25">
                    System
                </li>
                <li className="px-4 py-2 text-app-content hover:bg-app-content-25">
                    Dark
                </li>
                <li className="px-4 py-2 text-app-content hover:bg-app-content-25">
                    Light
                </li>
            </ul> */}
        </>
        // <div className="flex gap-4 p-4 bg-app-bg text-app-text">
        //     <select
        //         value={themeMode}
        //         onChange={(e) => setThemeMode(e.target.value as ThemeMode)}
        //         className="p-2 rounded border"
        //     >
        //         <option value="system">System</option>
        //         <option value="light">Light</option>
        //         <option value="dark">Dark</option>
        //     </select>

        //     {/* <select
        //         value={colorScheme}
        //         onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
        //         className="p-2 rounded border"
        //     >
        //         <option value="red">Default</option>
        //         <option value="blue">Blue</option>
        //     </select> */}
        // </div>
    );
};

export default ThemeSwitch;
