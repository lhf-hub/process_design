import { MVCApp } from "../../../MVCApp";
import { Action } from "../../../common/Action";
import { EventDefines } from "../../../common/EventDifines";
import { BaseController } from "../../../mvc/controller/BaseController";
import { ModelInfo } from "../../../mvc/model/ModelInfo";
import { ModelType } from "../../../mvc/model/ModelType";
import { ViewInfo } from "../../../mvc/view/ViewInfo";
import { ViewType } from "../../../mvc/view/ViewType";
import { ProcessLogModel } from "../process_log/ProcessLogModel";
import { MissionModel } from "./MissionModel";
import { MissionView } from "./MissionView";
import { MissionViewType } from "./MissionViewType";
import { MissionLogModel } from "./MissonLogModel";

export class MissionController extends BaseController {
    public override InitEvent(): void {
        this.Register(EventDefines.CreateMission, new Action(this.OnCreateMission.bind(this)));
        this.Register(EventDefines.GetAllMission, new Action(this.OnQueryAllMission.bind(this)));
        this.Register(EventDefines.GetMissionById, new Action(this.OnQueryMissionById.bind(this)));
        this.Register(EventDefines.GetMissionByName, new Action(this.OnQueryMissionByName.bind(this)));
        this.Register(EventDefines.GetOwnMission, new Action(this.OnGetOwnMission.bind(this)));
        this.Register(EventDefines.DeleteMission, new Action(this.OnDeleteMission.bind(this)));
        this.Register(EventDefines.UpdateMissionAll, new Action(this.OnUpdateMission.bind(this)));
        this.Register(EventDefines.UpdateMissionStatus, new Action(this.OnUpdateStatus.bind(this)));
        this.Register(EventDefines.CompleteMission, new Action(this.OnCompleteMission.bind(this)));
        this.Register(EventDefines.UpdateMissionReceiverId, new Action(this.OnUpdateReceiverId.bind(this)));
        this.Register(EventDefines.AcceptMission, new Action(this.OnAcceptMission.bind(this)));
        this.Register(EventDefines.RefuseMission, new Action(this.OnRefuseMission.bind(this)));
    }
    public override InitModel(): void {
        MVCApp.ModelManager.Register<MissionModel>(ModelType.Mission, new ModelInfo<MissionModel>(
            ModelType.Mission,
            this,
            MissionModel
        ));
        MVCApp.ModelManager.Register<ProcessLogModel>(ModelType.ProcessLog, new ModelInfo<ProcessLogModel>(
            ModelType.ProcessLog,
            this,
            ProcessLogModel
        ));
        MVCApp.ModelManager.Register<MissionLogModel>(ModelType.MissionLog, new ModelInfo<MissionLogModel>(
            ModelType.MissionLog,
            this,
            MissionLogModel
        ));
    }
    public override InitView(): void {
        MVCApp.ViewManager.Register<MissionView>(ViewType.Mission, new ViewInfo<MissionView>(
            ViewType.Mission,
            this,
            MissionView
        ));
    }

    /**
     * 创建任务
     * @param args 
     */
    private async OnCreateMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetAllFieldValue(
            {
                key: "id",
                value: requestData?.GetParam("id")
            },
            {
                key: "name",
                value: requestData?.GetParam("name")
            },
            {
                key: "content",
                value: requestData?.GetParam("content")
            },
            {
                key: "project_id",
                value: requestData?.GetParam("project_id")
            },
            {
                key: "status",
                value: requestData?.GetParam("status")
            },
            {
                key: "create_date",
                value: requestData?.GetParam("create_date")
            },
            {
                key: "complete_date",
                value: null
            },
            {
                key: "publisher_id",
                value: requestData?.GetParam("publisher_id")
            },
            {
                key: "receiver_id",
                value: requestData?.GetParam("receiver_id")
            }
        );
        try {
            result = await model?.Insert();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: employee?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `主管'${employee?.name}'创建了任务'${model?.GetFieldValue("name")}'`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, MissionViewType.Create);
        } catch (e) {
            result = false;
            console.error(e);
            view?.RenderResponseData(null, MissionViewType.Error);
        }
        view?.Response();
    }

    /**
     * 查询所有任务
     * @param args 
     */
    private async OnQueryAllMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        var result: any;
        try {
            result = await model?.SelectAll();
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.GetAllMission);
        view?.Response();
    }

    /**
     * 根据id查询任务
     * @param args 
     */
    private async OnQueryMissionById(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        try {
            switch (args[2] as string) {
                case "self":
                    result = await model?.QueryById(requestData?.GetParam("id") as string);
                    break;
                case "project":
                    result = await model?.QueryByProjectId(requestData?.GetParam("project_id") as string);
                    break;
                case "publisher":
                    result = await model?.QueryByPublisherId(requestData?.GetParam("publisher_id") as string);
                    break;
                case "receiver":
                    result = await model?.QueryByReceiverId(requestData?.GetParam("receiver_id") as string);
                    break;
                default:
                    view?.RenderResponseData(result, MissionViewType.Error);
                    view?.Response();
                    return;
            }
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.GetMission);
        view?.Response();
    }

    /**
     * 根据name查询任务
     * @param args 
     */
    private async OnQueryMissionByName(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        try {
            result = await model?.QueryByName(requestData?.GetParam("name") as string);
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.GetMission);
        view?.Response();
    }

    /**
     * 查询自己的任务
     * @param args
     */
    private async OnGetOwnMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        var result: any;
        try {
            const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
            result = await model?.QueryByReceiverId(employee.id);
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.GetMission);
        view?.Response();
    }

    /**
     * 删除任务
     * @param args
     */
    private async OnDeleteMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        try {
            result = await model?.Delete();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: employee?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `主管'${employee?.name}'删除了任务'${model?.GetFieldValue("name")}'`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, MissionViewType.DeleteMission);
        } catch (e) {
            result = false;
            console.error(e);
            view?.RenderResponseData(null, MissionViewType.Error);
        }
        view?.Response();
    }

    /**
     * 更新任务，所有字段
     * @param args
     */
    private async OnUpdateMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        try {
            await model?.Find();
        } catch (e) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            console.error(e);
            return;
        }
        if (!model) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            return;
        }
        model?.SetAllFieldValue(
            {
                key: "name",
                value: requestData?.GetParam("name")
            },
            {
                key: "content",
                value: requestData?.GetParam("content")
            },
            {
                key: "project_id",
                value: requestData?.GetParam("project_id")
            },
            {
                key: "status",
                value: requestData?.GetParam("status")
            },
            {
                key: "create_date",
                value: requestData?.GetParam("create_date")
            },
            {
                key: "complete_date",
                value: requestData?.GetParam("complete_date")
            },
            {
                key: "publisher_id",
                value: requestData?.GetParam("publisher_id")
            },
            {
                key: "receiver_id",
                value: requestData?.GetParam("receiver_id")
            }
        );
        try {
            result = await model?.Update();
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.UpdateMission);
        view?.Response();
    }

    /**
     * 更新任务状态，0:创建 1:待接受 2:进行中 3:完成 -1:被退回
     * @param args
     */
    private async OnUpdateStatus(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        try {
            await model?.Find();
        } catch (e) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            console.error(e);
            return;
        }
        if (!model) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("status", requestData?.GetParam("status"));
        try {
            result = await model?.Update();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: employee?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `任务'${model?.GetFieldValue("name")}'状态更新`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, MissionViewType.UpdateMission);
        } catch (e) {
            result = false;
            console.error(e);
            view?.RenderResponseData(null, MissionViewType.Error);
        }
        view?.Response();
        return;
    }

    /**
     * 任务完成
     * @param args
     */
    private async OnCompleteMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        try {
            await model?.Find();
        } catch (e) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            console.error(e);
            return;
        }
        if (!model) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("complete_date", new Date(Date.now()).toLocaleString().replace(',', ''));
        model?.SetFieldValue("status", 3);
        try {
            result = await model?.Update();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: employee?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `主管'${employee?.name}'将任务'${model?.GetFieldValue("name")}'设置为<完成>`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, MissionViewType.UpdateMission);
        } catch (e) {
            result = false;
            console.error(e);
            view?.RenderResponseData(null, MissionViewType.Error);
        }
        view?.Response();
        return;
    }
    
    /**
     * 更新任务接收者，分配任务
     * @param args
     */
    private async OnUpdateReceiverId(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        await model?.Find();
        if (!model) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("receiver_id", requestData?.GetParam("receiver_id"));
        model?.SetFieldValue("status", 1);
        try {
            result = await model?.Update();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: requestData?.GetParam("receiver_id")
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `主管'${employee?.name}'分配了任务'${model?.GetFieldValue("name")}'`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, MissionViewType.UpdateMission);
        } catch (e) {
            result = false;
            console.error(e);
            view?.RenderResponseData(null, MissionViewType.Error);
        }
        view?.Response();
        return;
    }

    /**
     * 接受任务
     * @param args
     */
    private async OnAcceptMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        await model?.Find();
        if (!model) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("status", 2);
        try {
            result = await model?.Update();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: employee?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `员工'${employee?.name}'接受了任务'${model?.GetFieldValue("name")}'`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.UpdateMission);
        view?.Response();
        return;
    }

    /**
     * 退回任务
     * @param args
     */
    private async OnRefuseMission(...args: any) {
        const model = this.InstantiateModel<MissionModel>(ModelType.Mission);
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const missionLog = this.InstantiateModel<MissionLogModel>(ModelType.MissionLog);
        const view = this.InstantiateView<MissionView>(ViewType.Mission, args[0], args[1]);
        const requestData = view?.GetRequestData();
        var result: any;
        const employee = await model?.GetEmployeeByUserId(view?.User.id as string);
        model?.SetFieldValue("id", requestData?.GetParam("id"));
        await model?.Find();
        if (!model) {
            view?.RenderResponseData(result, MissionViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("status", -1);
        missionLog?.SetAllFieldValue(
            {
                key: "mission_id",
                value: requestData?.GetParam("id")
            },
            {
                key: "receiver_id",
                value: requestData?.GetParam("receiver_id")
            },
            {
                key: "receiver_reply",
                value: requestData?.GetParam("receiver_reply")
            },
            {
                key: "publisher_id",
                value: requestData?.GetParam("publisher_id")
            }
        );
        try {
            result = await model?.Update();
            await missionLog?.Insert();
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: employee?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: `员工'${employee?.name}'退回了任务'${model?.GetFieldValue("name")}'，原因：${missionLog?.GetFieldValue("receiver_reply")}`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
        } catch (e) {
            result = false;
            console.error(e);
        }
        view?.RenderResponseData(result, MissionViewType.UpdateMission);
        view?.Response();
        return;
    }
}