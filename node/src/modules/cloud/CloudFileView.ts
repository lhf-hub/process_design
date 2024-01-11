import { BaseFileView } from "../../mvc/view/BaseFileView";
import { Request, Response } from "express";
import { CloudNodeRequestData } from "./CloudNodeRequestData";
import { CloudViewType } from "./CloudViewType";
import { File } from "../file_system/file";

export class CloudFileView extends BaseFileView {
    constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }
    public User: any;
    override Init() {
        this.requestData = new CloudNodeRequestData();
        const { id, parent_id, name, path, type ,project_id} = this.request.body as
            {
                id: string | undefined,
                parent_id: string | undefined,
                name: string | undefined,
                path: string | undefined,
                type: number | undefined,
                project_id:string | undefined
            };
        this.requestData.SetParamValue("id", id);
        this.requestData.SetParamValue("parent_id", parent_id);
        this.requestData.SetParamValue("name", name);
        this.requestData.SetParamValue("path", path);
        this.requestData.SetParamValue("type", type);
        this.requestData.SetParamValue("project_id",project_id)
        const { buffer } = this.request.body as { buffer: Buffer | undefined };
        this.file = buffer ?? null;
        this.User = this.request.body.user;

    }

    public override RenderResponseData(...data: any): void {
        const ViewType = data[1] as CloudViewType;

        switch (ViewType) {
            case CloudViewType.CloudNodeCreate:
                this.RenderCloudCreate(data[0]);
                break;
            case CloudViewType.CloudNodeDelete:
                this.RenderCloudDelete(data[0]);
                break;
            case CloudViewType.CloudNodeRename:
                this.RenderCloudNodeRename(data[0]);
                break;
            case CloudViewType.InitProjectStructure:
                this.RenderInitProjectStructure(data[0]);
                break;
            case CloudViewType.CloudNodeDownload:
                this.responseData = data[0];
                break;
            case CloudViewType.Error:
                this.RenderError();
                break;

            default:
                break;
        }
    }

    RenderCloudCreate(data: any) {
        var success = data as boolean;
        this.responseData = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success ? true : false
        }
    }

    RenderCloudDelete(data: any) {
        var success = data as boolean;
        this.responseData = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success ? true : false
        }
    }

    RenderCloudNodeRename(data: any) {
        var success = data as boolean;
        this.responseData = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success ? true : false
        }
    }

    RenderInitProjectStructure(data: any) {
        var success = data as boolean;
        this.responseData = {
            code: success ? 200 : 500,
            message: success ? "success" : "error",
            data: success ? true : false
        }
    }

    RenderError() {
        this.responseData = {
            code: 500,
            message: "error",
            data: null
        }
    }

    public override Response(): void {
        this.response.json(this.responseData);
    }

    public Download(): void {
        if ((this.responseData as File)?.Path != undefined) {
            this.response.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent((this.responseData as File).Name));
            this.response.sendFile((this.responseData as File)?.Path);
        }
    }

    public GetFile(): Buffer | null {
        return this.file;
    }
}