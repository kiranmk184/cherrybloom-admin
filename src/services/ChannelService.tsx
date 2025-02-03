import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";

const api = "http://127.0.0.1/api/v1/channel/";

export const loginApi = async (email: string, password: string) => {
  try {
    const data = await axios.post(api + "login", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const channelStoreApi = async (
  code: string,
  timezone: string,
  password: string
) => {
  try {
    const data = await axios.post(api + "register", {
      email: email,
      userName: username,
      password: password,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
