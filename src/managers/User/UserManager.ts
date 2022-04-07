import { Request } from "express";
import { TResponseApi } from "models/ResponseApi";

export default class UserManager {
    public static editProfile = async (req: Request) => {
    var response: TResponseApi<{ accessToken: string }> = { error: false, message: null, data: null, };
    
    
    return response;

    };
}
