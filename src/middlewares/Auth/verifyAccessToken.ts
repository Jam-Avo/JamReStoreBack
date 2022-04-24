import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from "config/config";
import { TResponseApi } from 'models/ResponseApi';

export const verifyAccessToken = ( req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers["authorization"]?.split(' ')[1] as string;
    
    var response: TResponseApi<null> = { error: false, message: null, data: null, errors: [] };

    if (!accessToken) {
        response.error = true;
        response.message = "Usuario no autorizado"
        return res.status(401).send(response);
    }

    let userToken: any

    try {
        userToken = jwt.verify(accessToken, config.secretAccessToken);
    } catch (error) {
        response.error = true;
        response.message = "Usuario no autorizado"
        return res.status(401).send(response);
    }
    
    req.userId = userToken.idUser;
    
    next();
}