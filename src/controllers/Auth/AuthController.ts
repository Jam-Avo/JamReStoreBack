import AuthManager from "managers/Auth/AuthManager";
import { Response, Request } from "express";

export default class AuthController {
  public static signIn = async (req: Request, res: Response) => {
    const result = await AuthManager.signIn(req);
    if (result.error) {
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  };

  public static signUp = async (req: Request, res: Response) => {
    const result = await AuthManager.signUp(req);
    if (result.error) {
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  };
  
  public static setNumberPhone = async (req: Request, res: Response) => {
    const result = await AuthManager.setNumber(req);
    if (result.error) {
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  };

  public static sendCode = async (req: Request, res: Response) => {
    const result = await AuthManager.sendCode(req);
    if (result.error) {
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  };

  public static validateCode = async (req: Request, res: Response) => {
    const result = await AuthManager.validateCode(req);
    if (result.error) {
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  };

  public static createPassword = async (req: Request, res: Response) => {
    const result = await AuthManager.createPassword(req);
    if (result.error) {
      res.status(500).send(result);
      return;
    }
    res.status(200).send(result);
  };

}
