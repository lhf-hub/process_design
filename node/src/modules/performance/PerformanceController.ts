import { MVCApp } from "../../MVCApp";
import { BaseController } from "../../mvc/controller/BaseController";
import { ModelInfo } from "../../mvc/model/ModelInfo";
import { ModelType } from "../../mvc/model/ModelType";
import { ViewInfo } from "../../mvc/view/ViewInfo";
import { ViewType } from "../../mvc/view/ViewType";
import { PerformanceModel } from "./PerformanceModel";
import { PerformanceView } from "./PerformanceView";

export class PerformanceController extends BaseController {
    public InitEvent(): void {

    }

    public InitModel(): void {
        MVCApp.ModelManager.Register<PerformanceModel>(ModelType.Performance, new ModelInfo(
            ModelType.Performance,
            this,
            PerformanceModel
        ));
    }

    public InitView(): void {
        MVCApp.ViewManager.Register<PerformanceView>(ViewType.Performance, new ViewInfo(
            ViewType.Performance,
            this,
            PerformanceView
        ));
    }
}