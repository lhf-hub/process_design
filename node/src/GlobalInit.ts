import { MVCApp } from "./MVCApp";
import { ControllerType } from "./mvc/controller/ControllerType";
import { ClientController } from "./modules/client/ClientController";
import { CloudController } from "./modules/cloud/CloudController";
import { UserController } from "./modules/account_sys/UserController";
import { ProjectController } from "./modules/project/ProjectController";
import { MissionController } from "./modules/project/mission/MissionController";
import { ProcessLogController } from "./modules/project/process_log/ProcessLogController";
import { PerformanceController } from "./modules/performance/PerformanceController";

export function GlobalInit() {
    // 初始化MVCApp
    new MVCApp();
    // 注册控制器
    MVCApp.ControllerManager.Register(ControllerType.ClientController, new ClientController());
    MVCApp.ControllerManager.Register(ControllerType.EmployeeController, new ClientController());
    MVCApp.ControllerManager.Register(ControllerType.CloudController, new CloudController());
    MVCApp.ControllerManager.Register(ControllerType.UserController, new UserController());
    MVCApp.ControllerManager.Register(ControllerType.ProjectController, new ProjectController());
    MVCApp.ControllerManager.Register(ControllerType.MissionController, new MissionController());
    MVCApp.ControllerManager.Register(ControllerType.ProcessLogController, new ProcessLogController());
    MVCApp.ControllerManager.Register(ControllerType.PerformanceController, new PerformanceController());
    // 初始化控制器
    MVCApp.ControllerManager.InitAll();

}
