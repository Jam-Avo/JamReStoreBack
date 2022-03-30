import config from "config/config";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import User, {IUser} from "models/Auth/User";
import { TResponseApi } from "models/ResponseApi";

export default class AuthManager {
  public static signIn = async (req: Request) => {
    const { email, password } = req.body as IUser;

    var response: TResponseApi<{ accessToken: string }> = { error: false, message: null, data: null, };
    
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

    response.data = { accessToken };

    return response;

  };

  public static signUp = async (req: Request) => {
    const { email, password, name } = req.body as IUser;

    var response: TResponseApi<{accessToken: string}> = { error: false, message: null, data: null, };
    
    if (!(email && password && name)) {
     response.error = true;
      response.message = "Campos requeridos faltantes";
      return response;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      response.error = true;
      response.message = "Correo electronico en uso";
      return response;
    }

    const user = new User({ name, password, email });

    user.password = await user.encryptPassword(user.password);

    console.log({ user });
    
    await user.save();

    const accessToken = jwt.sign({ idUser: user._id }, config.secretAccessToken, {
      expiresIn: "24h"
    });

    response.data = { accessToken };

    return response;
  };

  public static setNumber = async (req: Request) => {
    const { number } = req.body as IUser;

    var response: TResponseApi<{ accessToken: string }> = { error: false, message: null, data: null, };
    
    if (!(number)) {
      response.error = true;
      response.message = "Campo de número requerido faltante";
      return response;
    }
  };
}
