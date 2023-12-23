import Express from "express";
import { MVCApp } from "../MVCApp";
import { ControllerType } from "../mvc/controller/ControllerType";
import { EventDefines } from "../common/EventDifines";
import bodyParser from "body-parser";


export const Client = Express.Router();
Client.use(bodyParser.urlencoded());
Client.use(bodyParser.json());

Client.post("/client/query", (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.GetClient, req, res);
});

Client.post("/client/insert", (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.InsertClient, req, res);
});

Client.post("/client/update", (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.UpdateClient, req, res);
});

Client.post("/client/delete", (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.DeleteClient, req, res);
});

Client.post("/client/getCompanyClient", (req, res) => { // 级联查询，封装所有数据返回
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ClientController, EventDefines.GetCompanyClient, req, res);
});

