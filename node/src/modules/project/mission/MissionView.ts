import { Request, Response } from "express";
import { BaseJsonView } from "../../../mvc/view/BaseJsonView";
import { MissionRequestData } from "./MissionRequestData";
import { MissionViewType } from "./MissionViewType";

export class MissionView extends BaseJsonView {
    public constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }

    public User: any;

    public override Init(): void {
        this.requestData = new MissionRequestData();

        const { id, name, content, project_id, status, create_date, publisher_id, receiver_id, receiver_reply, bonus } = this.request.body as {
            id: string,
            name: string,
            content: string,
            project_id: string,
            status: string,
            create_date: string,
            publisher_id: string,
            receiver_id: string,
            receiver_reply: string,
            bonus: string
        };

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
                key: "content",
                value: content
            },
            {
                key: "project_id",
                value: project_id
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
                key: "publisher_id",
                value: publisher_id
            },
            {
                key: "receiver_id",
                value: receiver_id
            },
            {
                key: "receiver_reply",
                value: receiver_reply
            },
            {
                key: "bonus",
                value: bonus
            }
        );

        this.User = this.request.body.user;
    }

    public override RenderResponseData(...data: any): void {
        const viewType = data[1] as MissionViewType;
        switch (viewType) {
            case MissionViewType.Create:
                this.RenderMissionCreate(data[0]);
                break;
            case MissionViewType.GetAllMission:
                this.RenderGetAllMission(data[0]);
                break;
            case MissionViewType.GetMission:
                this.RenderGetMission(data[0]);
                break;
            case MissionViewType.DeleteMission:
                this.RenderDeleteMission(data[0]);
                break;
            case MissionViewType.UpdateMission:
                this.RenderUpdateMission(data[0]);
                break;
            case MissionViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
    }

    private RenderMissionCreate(data: any): void {
        const success = data as boolean;
        this.json = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success
        }
    }

    private RenderGetAllMission(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderGetMission(data: any): void {
        this.json = {
            code: 200,
            message: "success",
            data: data
        }
    }

    private RenderDeleteMission(data: any): void {
        const success = data as boolean;
        this.json = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success
        }
    }

    private RenderUpdateMission(data: any): void {
        const success = data as boolean;
        this.json = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success
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