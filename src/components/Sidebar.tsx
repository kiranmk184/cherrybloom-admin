import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="absolute w-[25.25rem] m-0 p-2 pt-0">
      <nav className="bg-[rgba(10,11,11,0.25)] border-1 border-[rgba(242,248,249,.25)] rounded-md p-[.5rem] h-[calc(100vh-3.375rem)] text-white-75 text-lg font-semibold">
        <div className="px-2">
          <Link
            to="/"
            className="flex gap-2 items-center hover:bg-white-25 p-2 rounded-md"
          >
            <span className="material-symbols-rounded ">dashboard</span>
            Dashboard
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/order"
            className="flex gap-2 items-center hover:bg-white-25 p-2 rounded-md"
          >
            <span className="material-symbols-rounded ">receipt_long</span>
            Orders
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/channel"
            className="flex gap-2 items-center hover:bg-white-25 p-2 rounded-md"
          >
            <span className="material-symbols-rounded ">storefront</span>
            Channels
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/category"
            className="flex gap-2 items-center hover:bg-white-25 p-2 rounded-md"
          >
            <span className="material-symbols-rounded ">category</span>
            Categories
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/product"
            className="flex gap-2 items-center hover:bg-white-25 p-2 rounded-md"
          >
            <span className="material-symbols-rounded ">package_2</span>
            Products
          </Link>
        </div>
        <div className="px-2">
          <Link
            to="/category"
            className="flex gap-2 items-center hover:bg-white-25 p-2 rounded-md"
          >
            <span className="material-symbols-rounded ">inventory_2</span>
            Inventories
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
