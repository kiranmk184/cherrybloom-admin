export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
};

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    emailVerifiedAt: Date;
    roleId: number;
    image: string;
};