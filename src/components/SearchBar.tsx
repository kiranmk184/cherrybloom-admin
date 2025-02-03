const SearchBar = () => {
    return (
        <form action="" className='flex items-center'>
            <div className='relative'>
                <div className='absolute left-[.25rem] flex justify-center items-center  h-[2rem] w-auto'>
                    <span className="material-symbols-rounded text-white-75">
                        search
                    </span>
                </div>
                <input type="text" className='bg-white-25 block h-[2rem] px-8 pl-8 text-white rounded-md focus:outline-1 focus:outline-white-75' placeholder='Search' />
                <div className='absolute top-0 right-[.5rem] flex justify-center items-center h-[2rem] w-auto'>
                    <p className='text-white-75 font-semibold'>CTRL K</p>
                </div>
            </div>
        </form>
    )
}

export default SearchBar