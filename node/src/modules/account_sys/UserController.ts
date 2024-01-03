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
import { BossAccount } from "./StaticUserConfig";
import { UserLoginView } from "./UserLoginView";
import { UserModel } from "./UserModel";
import { UserRegisterView } from "./UserRegisterView";
import { UserRequestData } from "./UserRequestData";
import { UserViewType } from "./UserViewType";

export class UserController extends BaseController {
    public override InitEvent(): void {
        this.Register(EventDefines.UserRegister, new Action(this.RegisterAccount.bind(this)));
        this.Register(EventDefines.UserLogin, new Action(this.LoginAccount.bind(this)));
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
        MVCApp.ViewManager.Register<UserRegisterView>(ViewType.UserRegister, new ViewInfo<UserRegisterView>(
            ViewType.UserRegister,
            this,
            UserRegisterView
        ));
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
        var result = { success: false, token: "", user: null };
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
                    result.success = true;
                    break;
                case "Front":
                    role = RoleType.Front;
                    if (id != BossAccount.id || password != BossAccount.password) {
                        view?.RenderResponseData(result, UserViewType.UserLogin);
                        view?.Response();
                        return;
                    }
                    result.success = true;
                    break;
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
                id: model?.GetFieldValue("id") as string,
                password: model?.GetFieldValue("password") as string,
                role: role
            });
            view?.RenderResponseData(result, UserViewType.UserLogin);
        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, UserViewType.Error);
        }
        view?.Response();
    }


}