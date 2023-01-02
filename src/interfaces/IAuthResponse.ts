import IUser from "./IUser";

interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export default IAuthResponse;