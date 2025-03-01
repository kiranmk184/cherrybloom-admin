import { useState, useEffect } from "react";
import DataGrid from "../../../components/DataGrid";
import { useCategories } from "../services/queries";

interface CategoryTranslation {
    id: string;
    categoryId: string;
    localeId: string;
    name: string;
    slug: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    urlPath: string;
}

interface Category {
    id: string;
    parentId?: string;
    displayMode: string;
    position: number;
    _lft: string;
    _rgt: string;
    categoryImg: string;
    categoryIcon: string;
    status: boolean;
    additional: string[];
    categoryTranslations: CategoryTranslation[];
    createdAt: string;
}

const CategoriesGrid = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: categoryData, isLoading: isCategoriesLoading } = useCategories();

    // Load categories
    useEffect(() => {
        if (!isCategoriesLoading) {
            setCategories(categoryData);
            setIsLoading(false);
        }
    }, [categoryData, isCategoriesLoading]);

    // Define columns
    const columns = [
        {
            header: "ID",
            accessor: "id",
            sortable: true,
            width: "80px",
        },
        {
            header: "Name",
            accessor: (item) => item.categoryTranslations[0].name,
            sortable: true,
            minWidth: 200,
            grow: 3,
        },
        {
            header: "Slug",
            accessor: (item) => item.categoryTranslations[0].slug,
            sortable: true,
            grow: 2,
        },
        {
            header: "Description",
            accessor: (item) => item.categoryTranslations[0].description,
            sortable: true,
            grow: 2,
        },
        {
            header: "Parent",
            accessor: "parentId",
            sortable: true,
            width: "100px",
        },
        {
            header: "Display Mode",
            accessor: "displayMode",
            sortable: true,
            width: "100px",
        },
        {
            header: "Position",
            accessor: "position",
            sortable: true,
            width: "80px",
        },
        {
            header: "Image",
            accessor: "categoryImg",
            sortable: true,
            width: "100px",
        },
        {
            header: "Icon",
            accessor: "categoryIcon",
            sortable: true,
            width: "100px",
        },
        {
            header: "Status",
            accessor: "status",
            sortable: true,
            width: "100px",
        },
        {
            header: "Meta Title",
            accessor: (item) => item.categoryTranslations[0].metaTitle,
            sortable: true,
            grow: 2,
        },
        {
            header: "Meta Description",
            accessor: (item) => item.categoryTranslations[0].metaDescription,
            sortable: true,
            grow: 2,
        },
        {
            header: "Keywords",
            accessor: (item) => item.categoryTranslations[0].metaKeywords,
            sortable: true,
            grow: 2,
        },
        {
            header: "URL Path",
            accessor: (item) => item.categoryTranslations[0].urlPath,
            sortable: true,
            grow: 2,
        },
        {
            header: "Created",
            accessor: (item: Category) =>
                new Date(item.createdAt).toLocaleDateString(),
            sortable: true,
            width: "120px",
        },
        {
            header: "Updated",
            accessor: (item: Category) =>
                new Date(item.createdAt).toLocaleDateString(),
            sortable: true,
            width: "120px",
        },
    ];

    // Handlers
    const handleReorder = async (updatedCategories: Category[]) => {
        try {
            await fetch("/api/categories/reorder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCategories),
            });
            setCategories(updatedCategories);
        } catch (error) {
            console.error("Failed to reorder categories:", error);
        }
    };

    const handleEdit = (category: Category) => {
        // Open edit modal/form
        console.log("Edit category:", category);
    };

    const handleDelete = (category: Category) => {
        // Show confirmation dialog before deleting
        if (
            window.confirm(
                `Are you sure you want to delete "${category.name}"?`
            )
        ) {
            // Delete logic
            console.log("Delete category:", category);
        }
    };

    if (isLoading) {
        return <div className="text-app-content-50">Loading categories...</div>;
    }

    return (
        <DataGrid
            data={categories}
            columns={columns}
            onReorder={handleReorder}
            onEdit={handleEdit}
            onDelete={handleDelete}
            enableRowSelection={true}
            enableNesting={true}
        />
    );
};

export default CategoriesGrid;
