import CategoriesGrid from "./components/CategoriesGrid";

const Category = () => {
    return (
        <>
            <div className="mx-[1rem] flex justify-between items-end text-app-content-85">
                <div>
                    <h4 className="font-semibold text-app-content-95">
                        Category Management
                    </h4>
                    <p className="text-app-content-75">
                        All the categories are in the extact same order that
                        they appear in the web. Shuffle them around to change
                        position.
                    </p>
                </div>
                <button
                    className="block text-app-content bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none font-medium rounded-[.5rem] text-sm text-center  px-5 py-2.5 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus-blue-800"
                    type="button"
                >
                    Add Category
                </button>
            </div>

            <div className="m-[1rem]">
                <CategoriesGrid />
            </div>
        </>
    );
};

export default Category;
