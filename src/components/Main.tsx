import Breadcrumbs from "./Breadcrumbs"
import Header from "./Header"

const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="absolute left-[25.25rem] m-0 p-2 pt-0 w-[calc(100%-25.25rem)] text-white">
                <section className="bg-[rgba(10,11,11,0.25)] border-1 border-[rgba(242,248,249,.25)] rounded-md p-[.5rem] h-[calc(100vh-3.375rem)]">
                    <header className="pb-[.5rem] border-b-1 border-b-white-25">
                        <Breadcrumbs />
                    </header>
                    {children}
                </section>
            </main>
        </>
    )
}

export default Main