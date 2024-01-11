import { NextFunction, Request, Response } from "express";
import { Authorization } from "./Authorization";
import { RoleType } from "./RoleType";
import { GetConnection, Query } from "../../common/Query";
import { ConnectionPool } from "../..";

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

export const AuthorizeAccessCloud = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;

    if (user.role == RoleType.Boss || user.role == RoleType.Supervisor) {
        next();
        return;
    }
    if (req.body.id == "\\projects" || req.body.id == "root") {
        next();
        return;
    }
    try {

        const sql = `select * from employee_cloud_view where user_id = '${user.id}'`;
        let tem = await Query(await GetConnection(ConnectionPool), sql);

        for (let element of tem) {
            if (element.cloud_id == req.body.id) {
                next();
                return;
            }
            let arr: any[] = [];
            await DeepGetChildren(element.cloud_id, arr);

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == req.body.id) {
                    next();
                    return;
                }
            }
        }
        return res.sendStatus(403);
    }
    catch (err) {
        console.log(err);

        return res.sendStatus(403);
    }
};

async function DeepGetChildren(cloud_id: string, children: any[]) {
    const sql = `select * from cloud where parent_id = ?`;
    let nodes = await Query(await GetConnection(ConnectionPool), sql, [cloud_id]);

    for (let i of nodes) {
        children.push(i);
        await DeepGetChildren(i.id, children);
    }
}