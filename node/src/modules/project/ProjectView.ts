import { Request, Response } from "express";
import { BaseJsonView } from "../../mvc/view/BaseJsonView";
import { ProjectRequestData } from "./ProjectRequestData";
import { ProjectViewType } from "./ProjectViewType";

export class ProjectView extends BaseJsonView {
    constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }

    public User: any;
    public override Init(): void {
        this.requestData = new ProjectRequestData();
        const { id, name, quotation, client_id, status, create_date, complete_date, cloud_id, supervisorModel, supervisorRender, supervisorBack, project_id } = this.request.body as {
            id: string,
            name: string,
            quotation: string,
            client_id: string,
            status: string,
            create_date: string,
            complete_date: string,
            cloud_id: string,
            supervisorModel: string,
            supervisorRender: string,
            supervisorBack: string,
            project_id: string
        };

        this.User = this.request.body.user;

        this.requestData.SetParamValues(
            {
                key: "id",
                value: id
            },
            {
                key: "name",
                value: name
            },
            {
                key: "quotation",
                value: quotation
            },
            {
                key: "client_id",
                value: client_id
            },
            {
                key: "status",
                value: status
            },
            {
                key: "create_date",
                value: create_date
            },
            {
                key: "complete_date",
                value: complete_date
            },
            {
                key: "cloud_id",
                value: cloud_id
            },
            {
                key: "supervisorModel",
                value: supervisorModel
            },
            {
                key: "supervisorRender",
                value: supervisorRender
            },
            {
                key: "supervisorBack",
                value: supervisorBack
            },
            {
                key: "project_id",
                value: project_id
            }
        )
    }


    public override RenderResponseData(...data: any): void {
        const viewType = data[1] as ProjectViewType;
        switch (viewType) {
            case ProjectViewType.Create:
                this.RenderProjectCreate(data[0]);
                break;
            case ProjectViewType.GetAllProject:
                this.RenderGetAllProjects(data[0]);
                break;
            case ProjectViewType.GetProject:
                this.RenderGetProject(data[0]);
                break;
            case ProjectViewType.UpdateProject:
                this.RenderUpdateProject(data[0]);
                break;
            case ProjectViewType.DeleteProject:
                this.RenderDeleteProject(data[0]);
                break;
            case ProjectViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
    }

    private RenderProjectCreate(data: any): void {
        const success = data as boolean;
        this.json = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success
        }
    }

    private RenderGetAllProjects(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderGetProject(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderUpdateProject(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderDeleteProject(data: any): void {
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
