import { assets } from "../assets/assets";
import { useAuth } from "../context/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

type Props = {};

type LoginFormInputs = {
    email: string;
    password: string;
};

const validation = object().shape({
    email: string()
        .required("Email is required.")
        .email("Enter a valid email."),
    password: string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters."),
});

const Login = () => {
    const { loginUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({ resolver: yupResolver(validation) });
    const handleLogin = (form: LoginFormInputs) => {
        loginUser(form.email, form.password);
    };

    return (
        <>
            <header className="flex justify-center py-[2.5rem]">
                <img
                    src={assets.logo}
                    alt="cherrybloom"
                    className="w-auto h-[2.75rem]"
                />
            </header>
            <main className="flex justify-center items-center h-[calc(100vh-7.75rem)]">
                <section className=" border-1 border-[rgba(242,248,249,.50)] rounded-md p-4 py-8 shadow-xl shadow-white-15">
                    <h4 className="text-white-75 font-bold mb-[.5rem]">
                        Enter your credentials.
                    </h4>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <input
                                {...register("email")}
                                type="text"
                                placeholder="Email"
                                className="bg-white-10 p-2 w-[24rem] text-white-75 rounded-md focus:outline-1 focus:outline-white focus:bg-white-15"
                            />
                            {errors.email ? (
                                <p className="text-red-300">
                                    {errors.email.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <div>
                            <input
                                {...register("password")}
                                type="password"
                                placeholder="Password"
                                className="bg-white-10 p-2 w-[24rem] text-white-75 rounded-md focus:outline-1 focus:outline-white focus:bg-white-15"
                            />
                            {errors.password ? (
                                <p className="text-red-300">
                                    {errors.password.message}
                                </p>
                            ) : (
                                ""
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-primary-75 w-[12rem] h-[3.5rem] my-4 mx-auto rounded-[.5rem] hover:shadow-xl shadow-white-15 transition-shadow ease-out text-white-75 font-bold text-[1.3rem] hover:text-white"
                        >
                            Sign In
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
};

export default Login;
