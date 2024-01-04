import { ConnectionPool } from "../..";
import { MVCApp } from "../../MVCApp";
import { Action } from "../../common/Action";
import { EventDefines } from "../../common/EventDifines";
import { GetConnection } from "../../common/Query";
import { BaseController } from "../../mvc/controller/BaseController";
import { ModelInfo } from "../../mvc/model/ModelInfo";
import { ModelType } from "../../mvc/model/ModelType";
import { ViewInfo } from "../../mvc/view/ViewInfo";
import { ViewType } from "../../mvc/view/ViewType";
import { ProcessLogModel } from "../project/process_log/ProcessLogModel";
import { CloudFileModel } from "./CloudFileModel";
import { CloudFileView } from "./CloudFileView";
import { CloudNodeModel } from "./CloudNodeModel";
import { CloudView } from "./CloudView";
import { CloudViewType } from "./CloudViewType";
import Path from "path";

export class CloudController extends BaseController {
    constructor() {
        super();
    }

    public override InitEvent(): void {
        this.Register(EventDefines.GetCloudNodes, new Action(this.OnGetCloudNodes.bind(this)));
        this.Register(EventDefines.GetChildrenNodes, new Action(this.OnGetChildren.bind(this)));
        this.Register(EventDefines.GetParentNode, new Action(this.OnGetParent.bind(this)));
        this.Register(EventDefines.CreateCloudNode, new Action(this.OnCreateNode.bind(this)));
        this.Register(EventDefines.DeleteCloudNode, new Action(this.OnDeleteNode.bind(this)))
        this.Register(EventDefines.RenameCloudNode, new Action(this.OnRenameNode.bind(this)));
        this.Register(EventDefines.DownloadFile, new Action(this.DownloadFile.bind(this)));
        this.Register(EventDefines.InitProjectStructure, new Action(this.InitProjectStructure.bind(this)));
    }

    public override InitModel(): void {
        MVCApp.ModelManager.Register<CloudNodeModel>(ModelType.CloudNode, new ModelInfo(
            ModelType.CloudNode,
            this,
            CloudNodeModel
        ));
        MVCApp.ModelManager.Register<CloudFileModel>(ModelType.CloudFile, new ModelInfo(
            ModelType.CloudFile,
            this,
            CloudFileModel
        ));
        MVCApp.ModelManager.Register<ProcessLogModel>(ModelType.ProcessLog, new ModelInfo(
            ModelType.ProcessLog,
            this,
            ProcessLogModel
        ));

    }

    public override InitView(): void {
        MVCApp.ViewManager.Register<CloudView>(ViewType.Cloud, new ViewInfo(
            ViewType.Cloud,
            this,
            CloudView
        ));
        MVCApp.ViewManager.Register<CloudFileView>(ViewType.CloudFile, new ViewInfo(
            ViewType.CloudFile,
            this,
            CloudFileView
        ));
    }

    /**
     * 获取云盘节点
     * @param args [0] request [1] response
     * @returns 
     */
    private async OnGetCloudNodes(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudNodeModel>(ModelType.CloudNode);
        var view = this.InstantiateView<CloudView>(ViewType.Cloud, args[0], args[1]);
        var requestData = view?.GetRequestData();
        try {
            if (requestData?.GetParam("id") === undefined) {
                result = await model?.GetAllNodes();
                view?.RenderResponseData(result, CloudViewType.CloudNodes);
                view?.Response();
                return;
            }
            model?.SetFieldValue("id", requestData?.GetParam("id"));
            result = (await model?.Find())?.GetData();
            view?.RenderResponseData(result, CloudViewType.CloudNode);
            view?.Response();
        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }
        return;
    }

    /**
     * 获取子节点
     * @param args [0] request [1] response
     * @returns 
     */
    private async OnGetChildren(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudNodeModel>(ModelType.CloudNode);
        var view = this.InstantiateView<CloudView>(ViewType.Cloud, args[0], args[1]);
        var requestData = view?.GetRequestData();
        try {
            model?.SetFieldValue("id", requestData?.GetParam("id"));
            result = await model?.GetChildren();
            view?.RenderResponseData(result, CloudViewType.CloudNodeChildren);
            view?.Response();
        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }
        return;
    }

    /**
     * 获取父节点
     * @param args [0] request [1] response
     * @returns 
     */
    public async OnGetParent(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudNodeModel>(ModelType.CloudNode);
        var view = this.InstantiateView<CloudView>(ViewType.Cloud, args[0], args[1]);
        var requestData = view?.GetRequestData();
        try {
            model?.SetFieldValue("id", requestData?.GetParam("id"));
            if (await model?.Find() === null) {
                view?.RenderResponseData(null, CloudViewType.Error);
                view?.Response();
                return;
            }
            result = await model?.GetParent();
            view?.RenderResponseData(result, CloudViewType.CloudNodeParent);
            view?.Response();
        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }
        return;
    }

    /**
     * 新建文件或目录
     * @param args [0] request [1] response
     * @returns 
     */
    private async OnCreateNode(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudFileModel>(ModelType.CloudFile);
        var view = this.InstantiateView<CloudFileView>(ViewType.CloudFile, args[0], args[1]);
        var requestData = view?.GetRequestData();
        var buffer = view?.GetFile();
        try {

            model?.SetAllFieldValue(
                { key: "id", value: Path.join(requestData?.GetParam("path") as string, requestData?.GetParam("name") as string) },
                { key: "parent_id", value: requestData?.GetParam("parent_id") },
                { key: "name", value: requestData?.GetParam("name") },
                { key: "path", value: requestData?.GetParam("path") },
                { key: "type", value: requestData?.GetParam("type") }
            )
            if (model?.GetFieldValue("type") == 1) {
                model?.SetBuffer(buffer ?? Buffer.from([]));
                result = await model?.CreateFileNodeTransaction();
            } else if (model?.GetFieldValue("type") == 0) {
                result = await model?.CreateDirectoryNodeTransaction();
            } else {
                view?.RenderResponseData(null, CloudViewType.Error);
                view?.Response();
                return;
            }

            view?.RenderResponseData(result, CloudViewType.CloudNodeCreate);
            view?.Response();

        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }

    }

    /**
     * 删除文件或目录
     * @param args [0] request [1] response
     * @returns
     */
    private async OnDeleteNode(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudFileModel>(ModelType.CloudFile);
        var view = this.InstantiateView<CloudFileView>(ViewType.CloudFile, args[0], args[1]);
        var requestData = view?.GetRequestData();
        var buffer = view?.GetFile();
        try {

            model?.SetAllFieldValue(
                {
                    key: "id",
                    value: requestData?.GetParam("id")
                }
            )
            await model?.Find();
            if (model?.GetFieldValue("type") == 1) {
                result = await model?.DeleteFileNodeTransaction();
            } else if (model?.GetFieldValue("type") == 1) {
                result = await model?.DeleteDirectoryNodeTransaction();
            } else {
                view?.RenderResponseData(null, CloudViewType.Error);
                view?.Response();
                return;
            }

            view?.RenderResponseData(result, CloudViewType.CloudNodeDelete);
            view?.Response();

        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }
    }

    /**
     * 重命名文件或目录
     * @param args [0] request [1] response
     * @returns
     */
    private async OnRenameNode(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudFileModel>(ModelType.CloudFile);
        var view = this.InstantiateView<CloudFileView>(ViewType.CloudFile, args[0], args[1]);
        var requestData = view?.GetRequestData();
        try {

            model?.SetFieldValue("id", requestData?.GetParam("id"));
            await model?.Find();
            const oldName: string = model?.GetFieldValue("name") as string;
            model?.SetFieldValue("name", requestData?.GetParam("name"));
            result = await model?.RenameTransaction(oldName);
            view?.RenderResponseData(result, CloudViewType.CloudNodeRename);
            view?.Response();

        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }
    }

    /**
     * 下载文件
     * @param args [0] request [1] response
     * @returns
     */
    public async DownloadFile(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudFileModel>(ModelType.CloudFile);
        var view = this.InstantiateView<CloudFileView>(ViewType.CloudFile, args[0], args[1]);
        var requestData = view?.GetRequestData();
        try {
            model?.SetFieldValue("id", requestData?.GetParam("id"));
            await model?.Find();
            const file = await model?.Download();
            view?.RenderResponseData(file, CloudViewType.CloudNodeDownload);
            view?.Download();
        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
            view?.Response();
            return;
        }
    }

    public async InitProjectStructure(...args: any): Promise<void> {
        var result: any;
        var model = this.InstantiateModel<CloudFileModel>(ModelType.CloudFile);
        var logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        var view = this.InstantiateView<CloudFileView>(ViewType.CloudFile, args[0], args[1]);
        var requestData = view?.GetRequestData();
        // const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        try {
            result = await model?.InitProjectStructure(
                requestData?.GetParam("path") as string,
                requestData?.GetParam("name") as string
            );
            // logger?.SetAllFieldValue(
            //     { key: "log_content", value: `主管'${employee.name}'初始化了项目结构` },
            //     { key: "date", value: new Date() },
            //     { key: "employee_id", value: requestData?.GetParam("employee_id") },
            //     { key: "project_id", value: requestData?.GetParam("id") }
            // )
            // await logger?.Insert();
            view?.RenderResponseData(result, CloudViewType.InitProjectStructure);

        } catch (e) {
            console.error(e);
            view?.RenderResponseData(null, CloudViewType.Error);
        }
        view?.Response();
    }
}