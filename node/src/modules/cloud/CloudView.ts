import { Request, Response } from "express";
import { BaseJsonView } from "../../mvc/view/BaseJsonView";
import { CloudNodeRequestData } from "./CloudNodeRequestData";
import { CloudViewType } from "./CloudViewType";

export class CloudView extends BaseJsonView {
    constructor(req: Request, res: Response) {
        super(req, res);
        this.Init();
    }
    public User: any;

    public override Init(): void {
        this.requestData = new CloudNodeRequestData();
        const { id, parent_id, name, path, type } = this.request.body as
            {
                id: string | undefined,
                parent_id: string | undefined,
                name: string | undefined,
                path: string | undefined,
                type: string | undefined,
            };
        this.requestData.SetParamValue("id", id);
        this.requestData.SetParamValue("parent_id", parent_id);
        this.requestData.SetParamValue("name", name);
        this.requestData.SetParamValue("path", path);
        this.requestData.SetParamValue("type", type);
        this.User = this.request.body.user;
    }


    public override RenderResponseData(...data: any): void {
        const ViewType = data[1] as CloudViewType;

        switch (ViewType) {
            case CloudViewType.CloudNode:
                this.RenderCloudNode(data[0]);
                break;
            case CloudViewType.CloudNodes:
                this.RenderCloudNodes(data[0]);
                break;
            case CloudViewType.CloudNodeChildren:
                this.RenderCloudNodeChildren(data[0]);
                break;
            case CloudViewType.CloudNodeParent:
                this.RenderCloudNodeParent(data[0]);
                break;
            case CloudViewType.CloudNodeDelete:
                this.RenderCloudNodeDelete(data[0]);
                break;
            case CloudViewType.CloudNodeRename:
                this.RenderCloudNodeRename(data[0]);
                break;
            case CloudViewType.Error:
                this.RenderError();
                break;
            default:
                break;
        }
    }

    public override Response(): void {
        this.response.json(this.json);
    }

    private RenderCloudNode(data: any): void {
        if (data === undefined || data === null) {
            this.json = {
                code: 404,
                msg: "not found",
                data: null
            };
            return;
        }
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderCloudNodes(data: any): void {
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderCloudNodeChildren(data: any): void {
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderCloudNodeParent(data: any): void {
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderCloudNodeRoot(data: any): void {
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderCloudNodeDelete(data: any): void {
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderCloudNodeRename(data: any): void {
        this.json = {
            code: 200,
            msg: "success",
            data: data
        };
    }

    private RenderError(): void {
        this.json = {
            code: 500,
            msg: "error",
            data: null
        };
    }
}

