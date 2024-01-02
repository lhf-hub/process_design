import { MVCApp } from "./MVCApp";
import { ControllerType } from "./mvc/controller/ControllerType";
import { ClientController } from "./modules/client/ClientController";

export function GlobalInit() {
    // 初始化MVCApp
    new MVCApp();
    // 注册控制器
    MVCApp.ControllerManager.Register(ControllerType.ClientController, new ClientController());
    MVCApp.ControllerManager.Register(ControllerType.EmployeeController, new ClientController());

    // 初始化控制器
    MVCApp.ControllerManager.InitAll();

}
