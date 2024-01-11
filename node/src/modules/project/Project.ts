import Express from 'express';
import BodyParser from 'body-parser';
import { MVCApp } from '../../MVCApp';
import { ControllerType } from '../../mvc/controller/ControllerType';
import { EventDefines } from '../../common/EventDifines';
import { Authorize, Verify } from '../authorization/Middleware';
import { RoleType } from '../authorization/RoleType';
import { GetConnection, Query } from '../../common/Query';
import { ConnectionPool } from '../..';

export const Project = Express.Router();
Project.use(BodyParser.urlencoded({ extended: false }));
Project.use(BodyParser.json());

Project.post('/project/create', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.CreatProject, req, res);
});

Project.post('/project/getall', Verify, (req, res) => {
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

Project.post('/project/getProjectByEmployeeId', async (req, res) => {
    const { employee_id } = req.body;

    // console.log(employee_id);
    // console.log(req.body);
    const sql = `SELECT * FROM employee_project WHERE employee_id = ?`;
    var data;
    try {
        data = await Query(await GetConnection(ConnectionPool), sql, [employee_id]);

        console.log(data);
        res.json({
            code: 200,
            message: 'success',
            data: data
        });
    } catch (err) {
        console.log(err);
        res.json({
            code: 500,
            message: 'error',
            data: null
        });
    }
});
Project.post('/project/pullSupervisor', async (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.PullSupervisor, req, res);
}
);


Project.post('/project/completemodel', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.UpdateProjectModelPart, req, res);
});


Project.post('/project/completerender', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.UpdateProjectRenderPart, req, res);
});

Project.post('/project/completepostproduction', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.UpdateProjectPostProductionPart, req, res);
});
Project.post('/project/init', Verify, Authorize(RoleType.Supervisor, RoleType.Boss), (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.ProjectController, EventDefines.InitProject, req, res);
});



