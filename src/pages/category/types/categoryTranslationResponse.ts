type Create = {
    variant: "create";
};

type Edit = {
    variant: "edit";
};

export type Common = {
    category_id: number;
    locale_id: string;
    name: string;
    slug: string;
    description: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    url_path: string;
};

export type ApiGeneric = Common & (Create | Edit);
export type ApiGet = Edit & Common;