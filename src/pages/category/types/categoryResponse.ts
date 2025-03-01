type Create = {
    variant: "create";
};

type Edit = {
    variant: "edit";
    id: string;
};

export type Common = {
    parent_id: number;
    display_mode: "grid";
    position: number;
    _lft: number;
    _rgt: number;
    category_img: string;
    category_icon: string;
    status: number;
    additional: string;
    created_at: string;
    updated_at: string;
    category_translations: string;
};

export type ApiGeneric = Common & (Create | Edit);
export type ApiGet = Edit & Common;
