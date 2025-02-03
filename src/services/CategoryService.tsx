import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";

const api = "http://127.0.0.1/api/v1/category/";

// todo: use string literal types for api endpoints in services
// type Endpoint =
//   | '/api/v1/category'
//   | '/api/v1/order'
//   | '/api/v1/product';

export const categoryStoreApi = async (
  parentId: string | null | undefined,
  position: string,
  name: string,
  slug: string,
  description: string,
  displayMode: string | null | undefined,
  categoryIcon: string,
  status: number,
  additional: string | null | undefined
) => {
  try {
    console.log(categoryIcon);
    const data = await axios.post(api + "", {
      parent_id: parentId,
      position: position,
      name: name,
      slug: slug,
      description: description,
      display_mode: displayMode,
      category_icon: categoryIcon,
      status: status,
      additional: additional,
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
