import { Request, Response } from "express";
import { BaseJsonView } from "../../../mvc/view/BaseJsonView";
import { ProcessLogRequestData } from "./ProcessLogRequestData";
import { ProcessLogViewType } from "./ProcessLogViewType";

export class ProcessLogView extends BaseJsonView {
    constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }

    public User: any;
    public override Init(): void {
        this.requestData = new ProcessLogRequestData();
        const { id, log_content, employee_id, project_id } = this.request.body as {
            id: string,
            log_content: string,
            employee_id: string,
            project_id: string
        };

        this.User = this.request.body.user;

        this.requestData.SetParamValues(
            {
                key: "id",
                value: id
            },
            {
                key: "log_content",
                value: log_content
            },
            {
                key: "employee_id",
                value: employee_id
            },
            {
                key: "project_id",
                value: project_id
            }
        )
    }

    public override RenderResponseData(...data: any): void {
        const viewType = data[1] as ProcessLogViewType;
        switch (viewType) {
            case ProcessLogViewType.GetAllProcessLog:
                this.RenderGetAllProcessLog(data[0]);
                break;
            case ProcessLogViewType.GetProcessLog:
                this.RenderGetProcessLog(data[0]);
                break;
            case ProcessLogViewType.DeleteProcessLog:
                this.RenderDeleteProcessLog(data[0]);
                break;
            case ProcessLogViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
    }

    private RenderGetAllProcessLog(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderGetProcessLog(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderDeleteProcessLog(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
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