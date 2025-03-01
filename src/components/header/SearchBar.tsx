import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <form className="ml-[40rem] flex items-center">
            <div className="relative">
                <div className="absolute h-full left-[.5rem] flex justify-center items-center">
                    <SearchIcon className="text-app-content-75"/>
                </div>
                <input
                    type="text"
                    className="block h-[2rem] pl-10 rounded-[.5rem] focus:outline-1 focus:outline-app-content-25 text-app-content bg-app-content-15"
                    placeholder="Search"
                />
                <div className="absolute h-full top-0 right-[.5rem] flex justify-center items-center">
                    <p className="text-app-content-75">CTRL K</p>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
