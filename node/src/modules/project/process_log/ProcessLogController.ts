import { MVCApp } from "../../../MVCApp";
import { Action } from "../../../common/Action";
import { EventDefines } from "../../../common/EventDifines";
import { BaseController } from "../../../mvc/controller/BaseController";
import { ModelInfo } from "../../../mvc/model/ModelInfo";
import { ModelType } from "../../../mvc/model/ModelType";
import { ViewInfo } from "../../../mvc/view/ViewInfo";
import { ViewType } from "../../../mvc/view/ViewType";
import { ProcessLogModel } from "./ProcessLogModel";
import { ProcessLogRequestData } from "./ProcessLogRequestData";
import { ProcessLogView } from "./ProcessLogView";
import { ProcessLogViewType } from "./ProcessLogViewType";

export class ProcessLogController extends BaseController {
    public override InitEvent(): void {
        this.Register(EventDefines.GetAllProcessLog, new Action(this.OnGetProcessLogList.bind(this)));
        this.Register(EventDefines.GetProcessLogById, new Action(this.OnGetProcessLogById.bind(this)));
    }

    public override InitModel(): void {
        MVCApp.ModelManager.Register<ProcessLogModel>(ModelType.ProcessLog, new ModelInfo<ProcessLogModel>(
            ModelType.ProcessLog,
            this,
            ProcessLogModel
        ));
    }

    public override InitView(): void {
        MVCApp.ViewManager.Register<ProcessLogView>(ViewType.ProcessLog, new ViewInfo<ProcessLogView>(
            ViewType.ProcessLog,
            this,
            ProcessLogView
        ));
    }

    private async OnGetProcessLogList(...args: any): Promise<any> {
        const model = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<ProcessLogView>(ViewType.ProcessLog, args[0], args[1], args[2], args[3]);

        var result: any;
        try {
            result = await model?.SelectAll();
            view?.RenderResponseData(result, ProcessLogViewType.GetAllProcessLog);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(error, ProcessLogViewType.Error);
        }
        view?.Response();
    }

    private async OnGetProcessLogById(...args: any): Promise<any> {
        const model = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<ProcessLogView>(ViewType.ProcessLog);
        const requestData = view?.GetRequestData<ProcessLogRequestData>();

        var result: any;
        try {
            switch (args[2] as string) {
                case "self":
                    result = await model?.QueryById(requestData?.GetParam("id") as string);
                    break;
                case "project":
                    result = await model?.QueryByProjectId(requestData?.GetParam("project_id") as string);
                    break;
                case "employee":
                    result = await model?.QueryByEmployeeId(requestData?.GetParam("employee_id") as string);
                    break;
                default:
                    view?.RenderResponseData(null, ProcessLogViewType.Error);
                    view?.Response();
                    return;
            }
            view?.RenderResponseData(result, ProcessLogViewType.GetProcessLog);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(null, ProcessLogViewType.Error);
        }
        view?.Response();
    }
}