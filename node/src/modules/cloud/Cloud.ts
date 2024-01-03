import Express from 'express';
import { MVCApp } from '../../MVCApp';
import { EventDefines } from '../../common/EventDifines';
import { ControllerType } from '../../mvc/controller/ControllerType';
import BodyParser from 'body-parser';

export const Cloud = Express.Router();
Cloud.use(BodyParser.urlencoded({ extended: false }));
Cloud.use(BodyParser.json());

Cloud.post('/cloud/get', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.GetCloudNodes, req, res);
});

Cloud.post('/cloud/getchildren', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.GetChildrenNodes, req, res);
});

Cloud.post('/cloud/getparent', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.GetParentNode, req, res);
});

Cloud.post('/cloud/create', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.CreateCloudNode, req, res);
});

Cloud.post('/cloud/delete', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.DeleteCloudNode, req, res);
});

Cloud.post('/cloud/rename', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.RenameCloudNode, req, res);
});

Cloud.post('/cloud/download', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.DownloadFile, req, res);
});

Cloud.post('/cloud/initproject', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.InitProjectStructure, req, res);
});