import AuthManager from "models/Auth/AuthManager";
import { Response, Request } from "express";

export default class AuthController {
  public static signIn = async (req: Request, res: Response) => {
    const result = await AuthManager.signIn(req);
    if (result.error) {
      res.status(401).send(result);
      return;
    }
    res.status(200).send(result);
  };

  public static signUp = async (req: Request, res: Response) => {
    const result = await AuthManager.signUp(req);
    if (result.error) {
      res.status(401).send(result);
      return;
    }
    res.status(200).send(result);
  };

  public static authentication = async (req: Request, res: Response) => {
    const result = await AuthManager.authentication(req);
    res.status(200).send(result);
  };
}
