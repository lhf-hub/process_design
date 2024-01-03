import { NextFunction, Request, Response } from "express";
import { Authorization } from "./Authorization";
import { RoleType } from "./RoleType";

export const Verify = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    try {
        const user = await Authorization.VerifyToken(token);
        if (user == null)
            return res.sendStatus(403);
        req.body.user = user;
        next();
    }
    catch (err) {
        return res.sendStatus(403);
    }
};

export const Authorize = (...roles: RoleType[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;
        if (roles.includes(user.role)) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}