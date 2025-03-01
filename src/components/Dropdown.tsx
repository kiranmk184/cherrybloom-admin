import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";

export interface DropdownItem<T = string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
    iconOnly?: boolean;
    disabled?: boolean;
}

interface DropdownProps<T> {
    items: DropdownItem<T>[];
    selectedValue: T;
    onSelect: (value: T) => void;
    placeholder?: string;
    className?: string;
    menuClassName?: string;
    triggerClassName?: string;
    disabled?: boolean;
    position?: "bottom" | "top" | "left" | "right";
}

const DropdownInner = <T extends unknown>(
    {
        items,
        selectedValue,
        onSelect,
        placeholder = "Select...",
        className = "",
        menuClassName = "",
        triggerClassName = "",
        disabled = false,
        position = "bottom",
    }: DropdownProps<T>,
    ref: React.Ref<HTMLDivElement>
) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedItem = items.find((item) => item.value === selectedValue);

    useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const positionClasses = {
        bottom: "origin-top-right mt-2",
        top: "origin-bottom-right mb-2 bottom-full",
        left: "origin-top-right mr-2 right-full",
        right: "origin-top-left ml-2 left-full",
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative ${className}`}
            data-testid="dropdown-container"
        >
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`flex items-center justify-between cursor-pointer text-app-content-75 hover:text-app-content focus:text-app-content transition-colors ${triggerClassName}`}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {selectedItem?.iconOnly ? (
                    selectedItem.icon
                ) : (
                    <>
                        <span className="truncate">
                            {selectedItem?.label || placeholder}
                        </span>
                        <svg
                            className={`ml-2 h-5 w-5 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </>
                )}
            </button>

            {isOpen && (
                <ul
                    className={`absolute z-10 right-[.25rem] rounded-[.5rem] ${positionClasses[position]} ${menuClassName} border border-app-content-25 ring-1 ring-black/5 focus:outline-none bg-app-bg shadow-xl shadow-app-content-15`}
                    role="listbox"
                    tabIndex={-1}
                >
                    {items.map((item) => (
                        <li
                            key={String(item.value)}
                            role="option"
                            aria-selected={item.value === selectedValue}
                            className={`cursor-pointer px-[1rem] py-2 first:rounded-t-[.5rem] last:rounded-b-[.5rem] text-app-content-75 transition-colors ${
                                item.value === selectedValue
                                    ? "bg-app-content-25 hover:text-app-content"
                                    : "hover:bg-app-content-15 hover:text-app-content"
                            } ${
                                item.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            onClick={() => {
                                if (!item.disabled) {
                                    onSelect(item.value);
                                    setIsOpen(false);
                                }
                            }}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && (
                                    <>{item.icon}</>
                                )}
                                <span className="truncate">{item.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const Dropdown = forwardRef(DropdownInner) as <T>(
    props: DropdownProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element;
