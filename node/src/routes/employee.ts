import Express from "express";
import { MVCApp } from "../MVCApp";
import bodyParser from "body-parser";
import { ControllerType } from "../mvc/controller/ControllerType";
import { EventDefines } from "../common/EventDifines";
import { Verify } from "../modules/authorization/Middleware";

export const Employee = Express.Router();
Employee.use(bodyParser.urlencoded());
Employee.use(bodyParser.json());

Employee.post("/employee/query", Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.EmployeeController, EventDefines.FindEmployee, req, res);
});

Employee.post("/employee/getDepartmentEmployee", Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.EmployeeController, EventDefines.GetDepartmentEmployee, req, res);
});

Employee.post("/employee/insert", Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.EmployeeController, EventDefines.Insert, req, res);
});

Employee.post("/employee/update", Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.EmployeeController, EventDefines.Update, req, res);
});

Employee.post("/employee/delete", Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.EmployeeController, EventDefines.Delete, req, res);
});

