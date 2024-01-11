import Express from 'express';
import BodyParser from 'body-parser';
import { MVCApp } from '../MVCApp';
import { EventDefines } from '../common/EventDifines';
import { ControllerType } from '../mvc/controller/ControllerType';
import { Verify } from '../modules/authorization/Middleware';

export const User = Express.Router();
User.use(BodyParser.urlencoded({ extended: false }));
User.use(BodyParser.json());

// User.post('/user/register', (req, res) => {
//     MVCApp.ControllerManager.ApplyEvent(ControllerType.UserController, EventDefines.UserRegister, req, res);
// });

User.post('/user/login', (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.UserController, EventDefines.UserLogin, req, res);
});

User.post('/user/verify', Verify, (req, res) => {
    MVCApp.ControllerManager.ApplyEvent(ControllerType.UserController, EventDefines.UserVerify, req, res);
});