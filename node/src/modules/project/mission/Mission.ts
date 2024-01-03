import Express from 'express';
import BodyParser from 'body-parser';
import { MVCApp } from '../../../MVCApp';
import { EventDefines } from '../../../common/EventDifines';
import { ControllerType } from '../../../mvc/controller/ControllerType';
import { Authorize, Verify } from '../../authorization/Middleware';
import { RoleType } from '../../authorization/RoleType';

export const Mission = Express.Router();
Mission.use(BodyParser.urlencoded({ extended: false }));
Mission.use(BodyParser.json());

Mission.post('/mission/create', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.CreateMission, req, res);
});

Mission.post('/mission/getall', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetAllMission, req, res);
});

Mission.post('/mission/getbyid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor, RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetMissionById, req, res, "self");
});

Mission.post('/mission/getbyprojectid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor, RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetMissionById, req, res, "project");
});

Mission.post('/mission/getbypublisherid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetMissionById, req, res, "publisher");
});

Mission.post('/mission/getbyreceiverid', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetMissionById, req, res, "receiver");
});

Mission.post('/mission/getbyname', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetMissionByName, req, res);
});

Mission.post('/mission/getown', Verify, Authorize(RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.GetOwnMission, req, res);
});

Mission.post('/mission/updatestatus', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.UpdateMissionStatus, req, res, ["status"]);
});

Mission.post('/mission/updateall', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.UpdateMissionAll, req, res);
});

Mission.post('/mission/delete', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.DeleteMission, req, res);
});

Mission.post('/mission/complete', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.CompleteMission, req, res);
});

Mission.post('/mission/updatereceiver', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.UpdateMissionReceiverId, req, res);
});

Mission.post('/mission/accept', Verify, Authorize(RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.AcceptMission, req, res);
});

Mission.post('/mission/refuse', Verify, Authorize(RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.MissionController, EventDefines.RefuseMission, req, res);
});