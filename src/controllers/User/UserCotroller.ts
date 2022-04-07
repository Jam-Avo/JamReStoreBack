import { Response, Request } from "express";
import UserManager from "managers/User/UserManager";

export default class UserController {
    public static editProfile = async (req: Request, res: Response) => {
        const result = await UserManager.editProfile(req);
        if (result.error) {
            res.status(401).send(result);
            return;
        }
        res.status(200).send(result);
    };

}
