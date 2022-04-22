import config from "config/config";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import User, {IUser} from "models/Auth/User";
import { TResponseApi } from "models/ResponseApi";

export default class AuthManager {
  public static signIn = async (req: Request) => {
    const { email, password } = req.body as IUser;

    var response: TResponseApi<AccessToken> = { error: false, message: null, data: null, errors: [] };
    
    if (!(email && password)) {
      response.error = true;
      response.message = "Campos requeridos faltantes";
      return response;
    }

    const user = await User.findOne({ email });

    if (!user) {
      response.error = true;
      response.message = "Usuario no existe";
      return response;
    }

    const isValidPassword = await user.validatePassword(password, user.password);

    if (!isValidPassword) {
      response.error = true;
      response.message = "Contraseña incorrecta";
      return response;
    }

    console.log({ user })

    const accessToken = jwt.sign({ idUser: user._id }, config.secretAccessToken, {
      expiresIn: "24h"
    });

    // TODO: Devolver toda la informacion necesaria del usuario
    response.data = { accessToken };

    return response;

  };

  public static signUp = async (req: Request) => {
    const { email, name } = req.body as IUser;

    var response: TResponseApi<AccessToken> = { error: false, message: null, data: null, errors: [] };

    if (!email) {
      response.errors?.push({id: "email", message: "Campo Requerido"})
    }

    if (!name) {
      response.errors?.push({id: "name", message: "Campo Requerido"})
    }

    if (response.errors?.length != 0){
      response.error = true;
      return response; 
    } 

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      response.errors?.push({id: "email", message: "Correo no disponible"})
      response.error = true;
      return response;
    }

    const user = new User({ name, email });

    console.log({ user });
    
    await user.save();

    const accessToken = jwt.sign({ idUser: user._id }, config.secretAccessToken, {
      expiresIn: "24h"
    });

    response.data = { accessToken };

    return response;
  };

  public static setNumber = async (req: Request) => {
    const { numberPhone, countryCode } = req.body as IUser;

    var response: TResponseApi<null> = { error: false, message: null, data: null, };
    
    if (!(numberPhone && countryCode)) {
      response.error = true;
      response.message = "Campo de número requerido faltante";
      return response;
    }
    console.log({ numberPhone, countryCode })
    return response;

  };

  public static validateCode = async (req: Request) => {
    const { otpCodePhone } = req.body as IUser;

    const accessToken = req.headers["Authorization"] as string;

    console.log({accessToken});
    console.log({otpCodePhone});

    var response: TResponseApi<null> = { error: true, message: null, data: null, errors: [] };

    if (!(otpCodePhone)) {
      response.error = true;
      response.message = "Código de validación incompleto";
      return response;
    }
    console.log({ otpCodePhone })
    return response;

  };

  public static createPassword = async (req: Request) => {
    const { password } = req.body as IUser;
    const accessToken = req.headers["authorization"] as string;

    console.log(accessToken);

    var response: TResponseApi<{ accessToken: string }> = { error: false, message: null, data: null, errors: [] };

    console.log({ password });

    if (!(password)) {
      response.error = true;
      response.message = "Código de validación incompleto";
      return response;
    }

    return response;

  };
  
}
