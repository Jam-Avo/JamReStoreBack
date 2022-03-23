import config from "config/config";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

export default class AuthManager {
  public static signIn = async (req: Request) => {
    const { email, password } = req.body;

    if (!(email && password)) return { error: "Campos requeridos faltantes" };
    console.log({email, password})

    console.log({ email, password });

    const response = {error: false, message: null, data: null };

    return response;

  };

  public static signUp = async (req: Request) => {
    const { email, password, name } = req.body;

    if (!(email && password && name))
      return { error: "Campos requeridos faltantes" };

    console.log({ email, password, name });

    const response = {error: false, message: null, data: null };

    return response;
  };

  public static authentication = async (req: Request) => {
    const accessToken = <string>req.headers["accesstoken"];

    if (accessToken === null) return { error: "No hay AccessToken" };

    let user;
    try {
      user = <any>(
        jwt.verify(accessToken, process.env.KEY_ACCESSTOKEN || config.jwtSecret)
      );
    } catch (error) {
      return { error: "Usuario no autorizado" };
    }

    return { accessToken };
  };
}
