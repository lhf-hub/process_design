import { NextFunction, Request, Response } from "express";
import { Authorization } from "./Authorization";
import { RoleType } from "./RoleType";

export const Verify = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    const user = await Authorization.VerifyToken(token);
    if (user == null) return res.sendStatus(403);
    req.body.user = user;
    next();
};

export const Authorize = (role: RoleType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;
        if (user.role === role) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}