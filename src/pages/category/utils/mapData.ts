// import { ApiGeneric, Common } from "../types/categoryResponse";
// import { CategorySchema } from "../schemas/categorySchema";

// export function mapData(data: CategorySchema): ApiGeneric {
//     const common: Common = {
//         parent_id: data.parentId,
//     };

//     switch (data.variant) {
//         case "create": {
//             return { ...common, variant: data.variant };
//         }
//         case "edit": {
//             return { ...common, id: data.id, variant: data.variant };
//         }
//     }
// }
