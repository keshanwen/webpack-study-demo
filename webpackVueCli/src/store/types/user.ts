export enum RoleEnum {
    User,
    Admin
}

export interface UserState {
    username: string;
    role: RoleEnum
}