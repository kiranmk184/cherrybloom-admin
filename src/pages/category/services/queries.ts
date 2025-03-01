import axios from "axios";
import { endpoints } from "../../../utils/types/endpoints";
import { useQuery } from "@tanstack/react-query";
import { apiResponse } from "../../../utils/types/response";

const api = endpoints.category;

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            axios.get<apiResponse>(api).then((response) =>
                response.data.payload.categories.map((category: any) => ({
                    id: category.id,
                    parentId: category.parent_id,
                    displayMode: category.display_mode,
                    position: category.position,
                    _lft: category._lft,
                    _rgt: category._rgt,
                    categoryImg: category.category_img,
                    categoryIcon: category.category_icon,
                    status: category.status,
                    additional: category.additional,
                    createdAt: category.created_at,
                    updatedAt: category.updated_at,
                    categoryTranslations: category.category_translations,
                }))
            ),
        // axios.get<apiResponse>(api).then((response) =>
        //     response.data.payload.map((category: ApiGet) => ({
        //         id: category.id,
        //         displayMode: category.display_mode,
        //         position: category.position,

        //     }))
        // ),
    });
}
