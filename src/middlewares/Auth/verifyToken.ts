import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from "config/config";

export const verifyToken = ( req: Request, res: Response, next: NextFunction) => {
    const tokenAccess = req.headers.tokenaccess as string;

    if (!tokenAccess) {
        return res.status(401).send({ error : "No se encontro Access Token" });
    }

    let accessTokenPayload

    try {
        accessTokenPayload = jwt.verify(tokenAccess, config.secretAccessToken);
        res.locals.accessTokenPayload = accessTokenPayload; //TODO: Esta no es la mejor manera
    } catch (error) {
        return res.status(401).send({ error : "Usuario no autorizado" });
    }

    next();
}