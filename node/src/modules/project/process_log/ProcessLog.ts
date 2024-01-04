import Express from 'express';
import BodyParser from 'body-parser';
import { MVCApp } from '../../../MVCApp';
import { Authorize, Verify } from '../../authorization/Middleware';
import { RoleType } from '../../authorization/RoleType';
import { ControllerType } from '../../../mvc/controller/ControllerType';
import { EventDefines } from '../../../common/EventDifines';

export const ProcessLog = Express.Router();

ProcessLog.use(BodyParser.urlencoded({ extended: false }));
ProcessLog.use(BodyParser.json());

ProcessLog.post('/processlog/getall', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProcessLogController, EventDefines.GetAllProcessLog, req, res);
});

ProcessLog.post('/processlog/getbyid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProcessLogController, EventDefines.GetProcessLogById, req, res, "self");
});

ProcessLog.post('/processlog/getbyprojectid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProcessLogController, EventDefines.GetProcessLogById, req, res, "project");
});

ProcessLog.post('/processlog/getbyemployeeid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProcessLogController, EventDefines.GetProcessLogById, req, res, "employee");
});