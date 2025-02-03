import { Link, useLocation } from 'react-router'

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    if (pathnames.length === 0) {
        pathnames.push('dashboard');
    }

    return (
        <nav aria-label="bradcrumb" className='flex items-center gap-1 text-white-75 font-semibold'>
            <div className=' flex items-center gap-2'>
                <span className="material-symbols-rounded">
                    home
                </span>
                {`CherryBloom >`}
            </div>
            <ol className='inline-flex items-center space-x-1 md:space-x-3'>
                {
                    pathnames.map((value, index) => {
                        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                        return (
                            <li key={path}>
                                {
                                    index < pathnames.length - 1 ? (
                                        <Link to={path} className='text-blue-600 hover:text-blue-800'>
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </Link>
                                    ) : (
                                        <span className='' aria-current="page">
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </span>
                                    )
                                }
                            </li>
                        );
                    })
                }
            </ol>
        </nav>
    );
}

export default Breadcrumbs;