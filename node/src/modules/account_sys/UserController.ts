import { MVCApp } from "../../MVCApp";
import { Action } from "../../common/Action";
import { EventDefines } from "../../common/EventDifines";
import { BaseController } from "../../mvc/controller/BaseController";
import { ModelInfo } from "../../mvc/model/ModelInfo";
import { ModelType } from "../../mvc/model/ModelType";
import { ViewInfo } from "../../mvc/view/ViewInfo";
import { ViewType } from "../../mvc/view/ViewType";
import { Authorization } from "../authorization/Authorization";
import { RoleType } from "../authorization/RoleType";
import { BossAccount, FrontAccount } from "./StaticUserConfig";
import { UserLoginView } from "./UserLoginView";
import { UserModel } from "./UserModel";
import { UserRegisterView } from "./UserRegisterView";
import { UserRequestData } from "./UserRequestData";
import { UserViewType } from "./UserViewType";

export class UserController extends BaseController {
    public override InitEvent(): void {
        // this.Register(EventDefines.UserRegister, new Action(this.RegisterAccount.bind(this)));
        this.Register(EventDefines.UserLogin, new Action(this.LoginAccount.bind(this)));
        this.Register(EventDefines.UserVerify, new Action(this.Verify.bind(this)));
    }

    public override InitModel(): void {
        MVCApp.ModelManager.Register<UserModel>(ModelType.User, new ModelInfo<UserModel>(
            ModelType.User,
            this,
            UserModel
        ));
    }

    public override InitView(): void {
        MVCApp.ViewManager.Register<UserLoginView>(ViewType.UserLogin, new ViewInfo<UserLoginView>(
            ViewType.UserLogin,
            this,
            UserLoginView
        ));
        // MVCApp.ViewManager.Register<UserRegisterView>(ViewType.UserRegister, new ViewInfo<UserRegisterView>(
        //     ViewType.UserRegister,
        //     this,
        //     UserRegisterView
        // ));
    }

    /**
     * 此方法为跨模块事件，用于创建员工时调用
     * @param args args[0] => id，args[1] => password
     * @returns 是否注册成功
     */
    private async RegisterAccount(...args: any): Promise<boolean> {
        var result: any;
        var model = this.InstantiateModel<UserModel>(ModelType.User);
        model?.SetAllFieldValue(
            {
                key: "id",
                value: args[0]
            },
            {
                key: "password",
                value: args[1]
            }
        );
        try {
            result = await model?.Insert();
        } catch (e) {
            result = false;
            console.error(e);
        }
        return result;
    }

    private async LoginAccount(...args: any): Promise<void> {
        var result = { success: false, token: "", user: null as any };
        var model = this.InstantiateModel<UserModel>(ModelType.User);
        var view = this.InstantiateView<UserLoginView>(ViewType.UserLogin, args[0], args[1]);
        var requestData = view?.GetRequestData<UserRequestData>();
        const id = requestData?.GetParam("id");
        const password = requestData?.GetParam("password");
        var role: RoleType;
        try {
            // 查询
            switch (requestData?.GetParam("role") as string) {
                case "Boss":
                    role = RoleType.Boss;
                    if (id != BossAccount.id || password != BossAccount.password) {
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }
                    result.user = {
                        id: id as string,
                        password: password as string,
                        role: "Boss"
                    }
                    result.token = Authorization.RenderToken({
                        id: id as string,
                        password: password as string,
                        role: role
                    });
                    result.success = true;
                    view?.RenderResponseData(result, UserViewType.UserLogin);
                    view?.Response();
                    return;
                case "Front":
                    role = RoleType.Front;
                    if (id != FrontAccount.id || password != FrontAccount.password) {
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }
                    result.user = {
                        id: id as string,
                        password: password as string,
                        role: "Front"
                    }
                    result.token = Authorization.RenderToken({
                        id: id as string,
                        password: password as string,
                        role: role
                    });
                    result.success = true;
                    view?.RenderResponseData(result, UserViewType.UserLogin);
                    view?.Response();
                    return;
                case "Employee":
                    role = RoleType.Employee;
                    result.user = await model?.FindEmployeeAndAccount(id as string, password as string, false);
                    if (result.user == null) {
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }
                    result.success = true;
                    break;
                case "Supervisor":
                    role = RoleType.Supervisor;
                    result.user = await model?.FindEmployeeAndAccount(id as string, password as string, true);
                    if (result.user == null) {
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }
                    result.success = true;
                    break;
                default:
                    view?.RenderResponseData(null, UserViewType.Error);
                    view?.Response();
                    return;
            }
            // 生成token
            result.token = Authorization.RenderToken({
                id: id as string,
                password: password as string,
                role: role
            });
            view?.RenderResponseData(result, UserViewType.UserLogin);
        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, UserViewType.Error);
        }
        view?.Response();
    }

    private async Verify(...args: any): Promise<void> {
        const view = this.InstantiateView<UserLoginView>(ViewType.UserLogin, args[0], args[1]);
        const model = this.InstantiateModel<UserModel>(ModelType.User);
        if (view?.User == null) {
            view?.RenderResponseData(null, UserViewType.Error);
            view?.Response();
            return;
        }
        const user = view?.User;
        var result;

        try {
            // 查询
            switch (user.role as RoleType) {
                case RoleType.Boss:
                    result = {
                        id: user.id,
                        password: user.password,
                        role: "Boss",
                        account_id: user.id,
                        account_passWord: user.password,
                    }
                    view?.RenderResponseData(result, UserViewType.UserLogin);
                    view?.Response();
                    return;
                case RoleType.Front:
                    result = {
                        id: user.id,
                        password: user.password,
                        role: "Front",
                        account_id: user.id,
                        account_passWord: user.password,
                    }
                    view?.RenderResponseData(result, UserViewType.UserLogin);
                    view?.Response();
                    return;
                case RoleType.Employee:
                    result = await model?.FindEmployeeAndAccount(user.id as string, user.password as string, false);
                    if (result != null) {
                        result.role = "Employee";
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }

                    view?.RenderResponseData(null, UserViewType.Error);
                    view?.Response();
                    break;
                case RoleType.Supervisor:
                    result = await model?.FindEmployeeAndAccount(user.id as string, user.password as string, true);
                    if (result != null) {
                        result.role = "Supervisor";
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }

                    view?.RenderResponseData(null, UserViewType.Error);
                    view?.Response();
                    break;
                default:
                    view?.RenderResponseData(null, UserViewType.Error);
                    view?.Response();
                    return;
            }

        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, UserViewType.Error);
            view?.Response();
        }
    }
}
