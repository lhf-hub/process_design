import Express from 'express';
import BodyParser from 'body-parser';
import { MVCApp } from '../../MVCApp';
import { ControllerType } from '../../mvc/controller/ControllerType';
import { EventDefines } from '../../common/EventDifines';
import { Authorize, Verify } from '../authorization/Middleware';
import { RoleType } from '../authorization/RoleType';

export const Project = Express.Router();
Project.use(BodyParser.urlencoded({ extended: false }));
Project.use(BodyParser.json());

Project.post('/project/create', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.CreatProject, req, res);
});

Project.post('/project/getall', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.GetAllProject, req, res);
});

Project.post('/project/getbyid', Verify, Authorize(RoleType.Supervisor, RoleType.Boss, RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.GetProjectById, req, res);
});

Project.post('/project/getbyname', Verify, Authorize(RoleType.Boss, RoleType.Supervisor), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.GetProjectByName, req, res);
});

Project.post('/project/getbyclientid', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.GetProjectByClientId, req, res);
});

Project.post('/project/getjoined', Verify, Authorize(RoleType.Supervisor, RoleType.Employee), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.GetProjectJoined, req, res);
});

Project.post('/project/updatestatus', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.UpdateProjectStatus, req, res);
});

Project.post('/project/updateall', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.UpdateProjectAll, req, res);
});

Project.post('/project/delete', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.DeleteProject, req, res);
});

Project.post('/project/complete', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.CompleteProject, req, res);
});

Project.post('/project/archive', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.ArchiveProject, req, res);
});



