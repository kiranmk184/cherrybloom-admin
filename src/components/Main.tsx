import Breadcrumbs from "./Breadcrumbs";

const Main = ({
    children,
    isSidebarOpen,
}: {
    children: React.ReactNode;
    isSidebarOpen: boolean;
}) => {
    return (
        <>
            <main
                className={`absolute ${
                    isSidebarOpen
                        ? "left-[17rem] w-[calc(100%-17rem)]"
                        : "left-[3.5rem] w-[calc(100%-3.5rem)]"
                }`}
            >
                <section className="mt-[4.5rem] h-[calc(100vh-4.5rem)] bg-app-content-bg-25">
                    <header className="border-b-1 border-b-app-content-25">
                        <Breadcrumbs />
                    </header>
                    {children}
                </section>
            </main>
        </>
    );
};

export default Main;
