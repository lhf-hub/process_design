import Express from "express";
import { MVCApp } from "../MVCApp";
import { ControllerType } from "../mvc/controller/ControllerType";
import { EventDefines } from "../common/EventDifines";
import bodyParser from "body-parser";
import { Authorize, Verify } from "../modules/authorization/Middleware";
import { RoleType } from "../modules/authorization/RoleType";


export const Client = Express.Router();
Client.use(bodyParser.urlencoded());
Client.use(bodyParser.json());


Client.post("/client/query", Verify, Authorize(RoleType.Front), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.GetClient, req, res);
});

Client.post("/client/insert", Verify, Authorize(RoleType.Front), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.InsertClient, req, res);
});

Client.post("/client/update", Verify, Authorize(RoleType.Front), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.UpdateClient, req, res);
});

Client.post("/client/delete", Verify, Authorize(RoleType.Front), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.DeleteClient, req, res);
});

Client.post("/client/getCompanyClient", Verify, Authorize(RoleType.Front), (req, res) => { // 级联查询，封装所有数据返回
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.GetCompanyClient, req, res);
});

