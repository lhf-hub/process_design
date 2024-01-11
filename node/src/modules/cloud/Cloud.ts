import Express from 'express';
import { MVCApp } from '../../MVCApp';
import { EventDefines } from '../../common/EventDifines';
import { ControllerType } from '../../mvc/controller/ControllerType';
import BodyParser from 'body-parser';
import { AuthorizeAccessCloud, Verify } from '../authorization/Middleware';
import { RoleType } from '../authorization/RoleType';
import multer from 'multer';
const upload = multer();
export const Cloud = Express.Router();
Cloud.use(BodyParser.urlencoded({ extended: false }));
Cloud.use(BodyParser.json());

Cloud.post('/cloud/get', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.GetCloudNodes, req, res);
});

Cloud.post('/cloud/getchildren', Verify, AuthorizeAccessCloud, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.GetChildrenNodes, req, res);
});

Cloud.post('/cloud/getparent', Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.GetParentNode, req, res);
});

Cloud.post('/cloud/create', Verify, upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    req.body = {
        parent_id: req.body.parent_id,
        name: req.body.name,
        path: req.body.path,
        type: req.body.type,
        buffer: req.file?.buffer,
    };
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.CreateCloudNode, req, res);
});

Cloud.post('/cloud/delete', Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.DeleteCloudNode, req, res);
});

Cloud.post('/cloud/rename', Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.RenameCloudNode, req, res);
});

Cloud.post('/cloud/download', Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.DownloadFile, req, res);
});

Cloud.post('/cloud/initproject', Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.CloudController, EventDefines.InitProjectStructure, req, res);
});