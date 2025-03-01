// ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";
export type ColorScheme = "default" | "blue";

interface ThemeContextType {
    themeMode: ThemeMode;
    colorScheme: ColorScheme;
    setThemeMode: (mode: ThemeMode) => void;
    setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeMode] = useState<ThemeMode>("system");
    const [colorScheme, setColorScheme] = useState<ColorScheme>("default");

    useEffect(() => {
        const savedMode = localStorage.getItem("themeMode") as ThemeMode;
        const savedScheme = localStorage.getItem("colorScheme") as ColorScheme;

        if (savedMode) setThemeMode(savedMode);
        if (savedScheme) setColorScheme(savedScheme);
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        const systemDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const isDark =
            themeMode === "system" ? systemDark : themeMode === "dark";

        root.setAttribute("data-theme", isDark ? "dark" : "light");
        root.setAttribute("data-color-scheme", colorScheme);

        localStorage.setItem("themeMode", themeMode);
        localStorage.setItem("colorScheme", colorScheme);
    }, [themeMode, colorScheme]);

    return (
        <ThemeContext.Provider
            value={{ themeMode, colorScheme, setThemeMode, setColorScheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
