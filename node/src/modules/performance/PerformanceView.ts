import { BaseJsonView } from "../../mvc/view/BaseJsonView";
import { PerformanceRequestData } from "./PerformanceRequestData";
import { PerformanceViewType } from "./PerformanceViewType";
import { Request, Response } from "express";

export class PerformanceView extends BaseJsonView {
    constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }

    public User: any;
    public override Init(): void {
        this.requestData = new PerformanceRequestData();
        const { employee_id } = this.request.body as {
            employee_id: string,
        };

        this.User = this.request.body.user;

        this.requestData.SetParamValues(
            {
                key: "employee_id",
                value: employee_id
            }
        )
    }

    public override RenderResponseData(...data: any): void {
        const viewType = data[1] as PerformanceViewType;
        switch (viewType) {
            case PerformanceViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
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