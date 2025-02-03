import axios from "axios"
import { data } from "react-router";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        var error: any = error.response;
        if (Array.isArray(error?.data.errors)) {
            for (let e of error?.data.errors) {
                toast.warning(e.description);
            }
        } else if (typeof error?.data.errors === "object") {
            for (let e in error?.data.errors) {
                toast.warning(error.data.errors[e][0]);
            }
        } else if (error?.data) {
            toast.warning(error.data);
        } else if (error?.status == 401) {
            toast.warning("Please login");
            window.history.pushState("", "LoginPage", "/login");
        } else if (error) {
            toast.warning(error?.data);
        }

    }
}