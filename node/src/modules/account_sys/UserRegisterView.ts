import { BaseJsonView } from "../../mvc/view/BaseJsonView";
import { UserRequestData } from "./UserRequestData";
import { UserViewType } from "./UserViewType";

export class UserRegisterView extends BaseJsonView {
    public override Init(): void {
        super.Init();
        this.requestData = new UserRequestData();
        const { id, password } = this.request.body as { id: string, password: string };
        this.requestData.SetParamValues(
            {
                key: "id",
                value: id
            },
            {
                key: "password",
                value: password
            }
        );
    }

    public override RenderResponseData(...data: any): void {
        const viewType = data[1] as UserViewType;
        switch (viewType) {
            case UserViewType.UserRegister:
                this.RenderUserRegister(data[0]);
                break;
            case UserViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
    }

    private RenderUserRegister(data: any): void {
        const success = data as boolean;
        this.json = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success ? true : false
        };
    }

    private RenderError(): void {
        this.json = {
            code: 500,
            message: "error",
            data: null
        };
    }

    public override Response(): void {
        this.response.json(this.json);
    }


}