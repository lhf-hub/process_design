import { Request, Response } from "express";
import { BaseJsonView } from "../../mvc/view/BaseJsonView";
import { UserRequestData } from "./UserRequestData";
import { UserViewType } from "./UserViewType";

// 登录后会返回一个token，用作后续的请求的验证
export class UserLoginView extends BaseJsonView {
    constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }
    public User: any;
    public override Init(): void {
        super.Init();
        this.requestData = new UserRequestData();
        const { id, password, role } = this.request.body as { id: string, password: string, role: string };
        this.requestData.SetParamValues(
            {
                key: "id",
                value: id
            },
            {
                key: "password",
                value: password
            },
            {
                key: "role",
                value: role
            }
        );
        this.User = this.request.body.user;
    }

    public override RenderResponseData(...data: any): void {
        const viewType = data[1] as UserViewType;
        switch (viewType) {
            case UserViewType.UserLogin:
                this.RenderUserLogin(data[0]);
                break;
            case UserViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
    }

    private RenderUserLogin(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
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