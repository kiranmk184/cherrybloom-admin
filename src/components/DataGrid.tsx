// src/components/DataGrid/DataGrid.tsx
import React, {
    useState,
    useRef,
    useCallback,
    useMemo,
    useEffect,
} from "react";
import DataGridContextMenu from "./DataGridContextMenu";

// Type definitions
interface ColumnDef<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    sortable?: boolean;
    width?: number | string;
    minWidth?: number;
    maxWidth?: number;
    grow?: number;
}

interface DataGridProps<
    T extends { id: string; position: number; parentId?: string }
> {
    data: T[];
    columns: ColumnDef<T>[];
    onReorder: (updatedData: T[]) => Promise<void>;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    enableRowSelection?: boolean;
    enableNesting?: boolean;
    rowHeight?: number;
}

const DataGrid = <
    T extends { id: string; position: number; parentId?: string }
>({
    data,
    columns,
    onReorder,
    onEdit,
    onDelete,
    enableRowSelection = true,
    enableNesting = false,
    rowHeight = 48,
}: DataGridProps<T>) => {
    const [sortedData, setSortedData] = useState(data);
    const [selection, setSelection] = useState<Set<string>>(new Set());
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{
        visible: boolean;
        x: number;
        y: number;
        item: T | null;
    }>({
        visible: false,
        x: 0,
        y: 0,
        item: null,
    });

    const tableRef = useRef<HTMLDivElement>(null);

    // Handle context menu
    const handleContextMenu = (e: React.MouseEvent, item: T) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            item,
        });
    };

    // Close context menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setContextMenu((prev) => ({ ...prev, visible: false }));
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Selection logic
    const toggleSelection = useCallback((id: string) => {
        setSelection((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const toggleAll = useCallback(() => {
        setSelection((prev) =>
            prev.size === sortedData.length
                ? new Set()
                : new Set(sortedData.map((d) => d.id))
        );
    }, [sortedData]);

    // Drag and drop logic
    const handleDragStart = (e: React.DragEvent, id: string) => {
        e.dataTransfer.setData("text/plain", id);
        setDraggedId(id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add("bg-gray-50", "dark:bg-gray-800/50");
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.currentTarget.classList.remove("bg-gray-50", "dark:bg-gray-800/50");
    };

    const handleDrop = async (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        e.currentTarget.classList.remove("bg-gray-50", "dark:bg-gray-800/50");

        if (draggedId === targetId) return;

        const draggedIndex = sortedData.findIndex(
            (item) => item.id === draggedId
        );
        const targetIndex = sortedData.findIndex(
            (item) => item.id === targetId
        );

        const newData = [...sortedData];
        const [draggedItem] = newData.splice(draggedIndex, 1);
        newData.splice(targetIndex, 0, draggedItem);

        const updatedData = newData.map((item, index) => ({
            ...item,
            position: index + 1,
        }));

        setSortedData(updatedData);
        await onReorder(updatedData);
        setDraggedId(null);
    };

    // Sorting logic
    const handleSort = useCallback((accessor: keyof T) => {
        setSortedData((prev) => {
            const sorted = [...prev].sort((a, b) => {
                if (
                    typeof a[accessor] === "number" &&
                    typeof b[accessor] === "number"
                ) {
                    return (a[accessor] as number) - (b[accessor] as number);
                }
                return String(a[accessor]).localeCompare(String(b[accessor]));
            });
            return sorted;
        });
    }, []);

    const handleRowClick = (e: React.MouseEvent, id: string) => {
        if (e.detail === 1) {
            // Single click
            setExpandedIds((prev) => {
                const next = new Set(prev);
                if (next.has(id)) {
                    next.delete(id);
                } else {
                    next.add(id);
                }
                return next;
            });
        }
    };

    // Get flattened data with nesting support
    const flattenedData = useMemo(() => {
        if (!enableNesting) return sortedData;

        const flatten = (items: T[], depth = 0): (T & { depth: number })[] => {
            return items.reduce<(T & { depth: number })[]>((acc, item) => {
                const children = sortedData.filter(
                    (d) => d.parentId === item.id
                );
                return [
                    ...acc,
                    { ...item, depth },
                    ...(expandedIds.has(item.id)
                        ? flatten(children, depth + 1)
                        : []),
                ];
            }, []);
        };

        return flatten(sortedData.filter((d) => !d.parentId));
    }, [sortedData, expandedIds, enableNesting]);

    return (
        <div
            ref={tableRef}
            className="relative overflow-x-auto rounded-[.5rem] border border-app-content-25 bg-app-bg"
        >
            <table className="w-full">
                <thead className="bg-app-bg border-b border-app-content-25">
                    <tr>
                        {enableRowSelection && (
                            <th className="w-12 sticky left-0 z-20 bg-app-bg">
                                <div className="flex items-center justify-center p-2">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selection.size ===
                                                sortedData.length &&
                                            sortedData.length > 0
                                        }
                                        onChange={toggleAll}
                                        className="h-[1rem] w-[1rem] cursor-pointer"
                                    />
                                </div>
                            </th>
                        )}

                        {columns.map((column, colIndex) => (
                            <th
                                key={`header-${colIndex}`}
                                className={`p-[.5rem] text-left font-normal text-app-content-75`}
                                style={{
                                    width: column.width,
                                    minWidth: column.minWidth,
                                    maxWidth: column.maxWidth,
                                    flex: column.grow || 1,
                                }}
                            >
                                <div className="flex items-center gap-1">
                                    <span>{column.header}</span>
                                    {column.sortable &&
                                        typeof column.accessor === "string" && (
                                            <button
                                                onClick={() =>
                                                    handleSort(
                                                        column.accessor as keyof T
                                                    )
                                                }
                                                className="ml-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-app-content-25">
                    {flattenedData.map((item, rowIndex) => (
                        <tr
                            key={`row-${item.id}`}
                            onClick={(e) => handleRowClick(e, item.id)}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, item.id)}
                            onContextMenu={(e) => handleContextMenu(e, item)}
                            className={`
                            transition-colors duration-150
                            ${draggedId === item.id ? "opacity-50" : ""}
                            ${selection.has(item.id) ? "bg-app-primary" : ""}
                            hover:bg-app-content-5
                            `}
                            style={{ height: rowHeight }}
                        >
                            {enableRowSelection && (
                                <td className="w-12 sticky left-0 z-10">
                                    <div className="flex items-center justify-center p-2">
                                        <input
                                            type="checkbox"
                                            checked={selection.has(item.id)}
                                            onChange={() =>
                                                toggleSelection(item.id)
                                            }
                                            className="h-[1rem] w-[1rem] cursor-pointer"
                                        />
                                    </div>
                                </td>
                            )}

                            {columns.map((column, colIndex) => (
                                <td
                                    key={`cell-${item.id}-${colIndex}`}
                                    className="p-3 text-sm text-gray-800 dark:text-gray-200"
                                    style={{
                                        paddingLeft:
                                            enableNesting && colIndex === 0
                                                ? `${
                                                      (item.depth || 0) * 24 +
                                                      12
                                                  }px`
                                                : undefined,
                                    }}
                                >
                                    {typeof column.accessor === "function"
                                        ? column.accessor(item)
                                        : item[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {contextMenu.visible && contextMenu.item && (
                <DataGridContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onEdit={
                        onEdit ? () => onEdit(contextMenu.item as T) : undefined
                    }
                    onDelete={
                        onDelete
                            ? () => onDelete(contextMenu.item as T)
                            : undefined
                    }
                />
            )}
        </div>
    );
};

export default DataGrid;
