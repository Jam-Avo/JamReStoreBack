import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from "config/config";

export const checkJwt = ( req: Request, res: Response, next: NextFunction) => {
    const tokenAccess = <string>req.headers['auth'];
    let jwtPayload

    try {
        jwtPayload = <any>jwt.verify(tokenAccess, process.env.KEY_ACCESSTOKEN || config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send({ error : "Usuario no autorizado" });
    }

    const { id, email } = jwtPayload;
    console.log(id, email);

    const newTokenAccess = jwt.sign( {id, email}, process.env.KEY_ACCESSTOKEN || config.jwtSecret, { expiresIn: '1h'} );
    res.setHeader('token', newTokenAccess);

    next();
}