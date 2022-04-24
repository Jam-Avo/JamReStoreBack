import config from "config/config";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import User, {IUser} from "models/Auth/User";
import { TResponseApi } from "models/ResponseApi";
import { transporter } from "services/mailer";

export default class AuthManager {
  public static signIn = async (req: Request) => {
    const { email, password } = req.body as IUser;

    var response: TResponseApi<AccessToken> = { error: false, message: null, data: null, errors: [] };
    
    if (!email) {
      response.errors?.push({id: "email", message: "Campo Requerido"})
    }

    if (!password) {
      response.errors?.push({id: "password", message: "Campo Requerido"})
    }

    if (response.errors?.length != 0){
      response.error = true;
      return response; 
    }

    //TODO: Se debe buscar por userName tambien
    const user = await User.findOne({ email });

    if (!user) {
      response.error = true;
      response.errors?.push({id: "email", message: "Usuario no existe"})
      return response;
    }

    const isValidPassword = await user.validatePassword(password, user.password);

    if (!isValidPassword) {
      response.error = true;
      response.errors?.push({id: "password", message: "Contraseña incorrecta"})
      return response;
    }

    const accessToken = jwt.sign({ idUser: user._id }, config.secretAccessToken, {
      expiresIn: "24h"
    });

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
    const userId = req.userId;

    var response: TResponseApi<null> = { error: false, message: null, data: null, };
    
    if (!(numberPhone && countryCode)) {
      response.error = true;
      response.message = "Campo de número requerido faltante";
      return response;
    }
    console.log({ numberPhone, countryCode })
    return response;

  };

  public static sendCode = async (req: Request) => {

    const userId = req.userId;
    var response: TResponseApi<null> = { error: false, message: null, data: null, errors: [] };
    
    //TODO: Crear codigo de validacion

    await transporter.sendMail({
      from: '"JamReStore" <jamavocorp@gmail.com>',
      to: "jamt042831@gmail.com",
      subject: "Confirmar Correo JamReStore",
      text: "Hola, confirma tu cuenta",
      html: "<b>Codigo de seguridad: 000000</b>",
    });

    const user = await User.findOne({ _id: userId });

    if (!user) {
      response.error = true;
      response.message = 'Usuario no encontrado'
      return response;
    }

    user.otpCode = "000000";

    user.save();
    
    return response;
  }

  public static validateCode = async (req: Request) => {
    const { otpCode } = req.body as IUser;
    const userId = req.userId;

    var response: TResponseApi<null> = { error: false, message: null, data: null, errors: [] };
    
    if (!(otpCode)) {
      response.error = true;
      response.message = "Código de validación requerido";
      return response;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      response.error = true;
      response.message = 'Usuario no encontrado'
      return response;
    }

    if(user.otpCode != otpCode) {
      response.error = true;
      response.message = 'Codigo no valido'
      return response;
    }

    console.log({ otpCode })
    return response;

  };

  public static createPassword = async (req: Request) => {
    const { password } = req.body as IUser;
    const userId = req.userId;

    var response: TResponseApi<{ accessToken: string }> = { error: false, message: null, data: null, errors: [] };

    if (!(password)) {
      response.error = true;
      response.message = "Campo Requerido";
      return response;
    }
    
    const user = await User.findOne({ _id: userId });

    if (!user) {
      response.error = true;
      response.message = 'usuario no encontrado'
      return response;
    }

    user.password = await user.encryptPassword(password);

    user.save();

    return response;

  };
  
}
