import { MVCApp } from "../../MVCApp";
import { Action } from "../../common/Action";
import { EventDefines } from "../../common/EventDifines";
import { BaseController } from "../../mvc/controller/BaseController";
import { ModelInfo } from "../../mvc/model/ModelInfo";
import { ModelType } from "../../mvc/model/ModelType";
import { ViewInfo } from "../../mvc/view/ViewInfo";
import { ViewType } from "../../mvc/view/ViewType";
import { ProjectModel } from "./ProjecModel";
import { ProjectRequestData } from "./ProjectRequestData";
import { ProjectView } from "./ProjectView";
import { ProjectViewType } from "./ProjectViewType";
import { ProcessLogModel } from "./process_log/ProcessLogModel";

export class ProjectController extends BaseController {
    public override InitEvent(): void {
        this.Register(EventDefines.CreatProject, new Action(this.OnProjectCreate.bind(this)));
        this.Register(EventDefines.GetAllProject, new Action(this.OnGetProjects.bind(this)));
        this.Register(EventDefines.GetProjectById, new Action(this.OnGetProjectById.bind(this)));
        this.Register(EventDefines.GetProjectByName, new Action(this.OnGetProjectByName.bind(this)));
        this.Register(EventDefines.UpdateProjectStatus, new Action(this.OnUpdateProjectStatus.bind(this)));
        this.Register(EventDefines.GetProjectByClientId, new Action(this.OnGetProjectByClientId.bind(this)));
        this.Register(EventDefines.UpdateProjectAll, new Action(this.OnUpdateProjectAll.bind(this)));
        this.Register(EventDefines.DeleteProject, new Action(this.OnDeleteProject.bind(this)));
        this.Register(EventDefines.GetProjectJoined, new Action(this.OnGetProjectJoined.bind(this)));
        this.Register(EventDefines.CompleteProject, new Action(this.OnCompleteProject.bind(this)));
        this.Register(EventDefines.ArchiveProject, new Action(this.OnArchiveProject.bind(this)));
    }

    public override InitModel(): void {
        MVCApp.ModelManager.Register<ProjectModel>(ModelType.Project, new ModelInfo<ProjectModel>(
            ModelType.Project,
            this,
            ProjectModel
        ));
        MVCApp.ModelManager.Register<ProcessLogModel>(ModelType.ProcessLog, new ModelInfo<ProcessLogModel>(
            ModelType.ProcessLog,
            this,
            ProcessLogModel
        )
        )
    }

    public override InitView(): void {
        MVCApp.ViewManager.Register<ProjectView>(ViewType.Project, new ViewInfo<ProjectView>(
            ViewType.Project,
            this,
            ProjectView
        ));
    }

    private async OnProjectCreate(...args: any) {
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);

        var result: any;
        var model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        var view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
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
                key: "quotation",
                value: requestData?.GetParam("quotation")
            },
            {
                key: "client_id",
                value: requestData?.GetParam("client_id")
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
                key: "cloud_id",
                value: requestData?.GetParam("cloud_id")
            }
        )
        try {
            const employee = await model?.GetEmployeeByUserId(view?.User?.id);
            result = await model?.Insert();
            view?.RenderResponseData(result, ProjectViewType.Create);
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
                    value: "创建项目-成功"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
            logger?.SetAllFieldValue(
                {
                    key: "employee_id",
                    value: view?.User?.id
                },
                {
                    key: "project_id",
                    value: model?.GetFieldValue("id")
                },
                {
                    key: "log_content",
                    value: "创建项目-失败"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
        }
        view?.Response();
    }

    /**
     * 获取所有项目
     * @param args 
     */
    private async OnGetProjects(...args: any) {
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        var result: any;
        try {
            result = await model?.SelectAll();
            view?.RenderResponseData(result, ProjectViewType.GetAllProject);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 获取项目，根据项目id
     * @param args 
     */
    private async OnGetProjectById(...args: any) {
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        var result: any;
        try {
            result = await model?.QueryById(id as string);
            view?.RenderResponseData(result, ProjectViewType.GetProject);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 获取项目，根据客户id
     * @param args
     */
    private async OnGetProjectByClientId(...args: any) {
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        var result: any;
        try {
            result = await model?.QueryByClientId(id as string);
            view?.RenderResponseData(result, ProjectViewType.GetProject);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 根据名字查询项目，模糊查询
     * @param args
     */
    private async OnGetProjectByName(...args: any) {
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const name = requestData?.GetParam("name");
        if (!name) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        var result: any;
        try {
            result = await model?.QueryByName(name as string);
            view?.RenderResponseData(result, ProjectViewType.GetProject);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 获取员工自己参与的项目、
     * @param args
     */
    private async OnGetProjectJoined(...args: any) {
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const user = view?.User;

        if (!user) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        var result: any;
        try {
            result = await model?.QueryByEmployeeId(user.id);
            view?.RenderResponseData(result, ProjectViewType.GetProject);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 更新项目，第三个参数为要更新的字段
     * @param args 
     * @returns 
     */
    private async OnUpdateProject(...args: any) {
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const fields = args[2] as Array<string>;
        const id = requestData?.GetParam("id");
        const employee = await model?.GetEmployeeByUserId(view?.User?.id);
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("id", id);
        var result: any;
        try {
            await model?.Find();
            fields.forEach((field) => {
                model?.SetFieldValue(field, requestData?.GetParam(field));
            });
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
                    value: `更新项目信息 ${fields} -成功`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.UpdateProject);
        } catch (error) {
            console.error(error);
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
                    value: `更新项目信息 ${fields} -失败`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 更新项目状态，0为已创建，1为初始化，2为进行中，3为已完成，4为已归档。
     * @param args
     * @returns
     */
    private async OnUpdateProjectStatus(...args: any) {
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);

        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        const employee = await model?.GetEmployeeByUserId(view?.User?.id);
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("id", id);
        var result: any;
        const status: string = (requestData?.GetParam("status") as number) == 0
            ? "已创建" : (requestData?.GetParam("status") as number) == 1
                ? "初始化" : (requestData?.GetParam("status") as number) == 2
                    ? "进行中" : (requestData?.GetParam("status") as number) == 3
                        ? "已完成" : "已归档";
        try {
            await model?.Find();
            model?.SetFieldValue("status", requestData?.GetParam("status"));
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
                    value: `项目状态变更为${status}-成功`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.UpdateProject);
        } catch (error) {
            console.error(error);
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
                    value: `项目状态变更为${status}-失败`
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 更新项目，完全更新
     * @param args
     * @returns
     */
    private async OnUpdateProjectAll(...args: any) {
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        const employee = await model?.GetEmployeeByUserId(view?.User?.id);
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("id", id);
        var result: any;
        try {
            await model?.Find();
            model?.SetAllFieldValue(
                {
                    key: "name",
                    value: requestData?.GetParam("name") ?? model?.GetFieldValue("name")
                },
                {
                    key: "quotation",
                    value: requestData?.GetParam("quotation") ?? model?.GetFieldValue("quotation")
                },
                {
                    key: "client_id",
                    value: requestData?.GetParam("client_id") ?? model?.GetFieldValue("client_id")
                },
                {
                    key: "status",
                    value: requestData?.GetParam("status") ?? model?.GetFieldValue("status")
                },
                {
                    key: "create_date",
                    value: requestData?.GetParam("create_date") ?? model?.GetFieldValue("create_date")
                },
                {
                    key: "complete_date",
                    value: requestData?.GetParam("complete_date") ?? model?.GetFieldValue("complete_date")
                },
                {
                    key: "cloud_id",
                    value: requestData?.GetParam("cloud_id") ?? model?.GetFieldValue("cloud_id")
                }
            );
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
                    value: "更新项目信息-成功"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.UpdateProject);
        } catch (error) {
            console.error(error);
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
                    value: "更新项目信息-失败"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            await logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 删除项目
     * @param args
     * @returns
     */
    private async OnDeleteProject(...args: any) {
        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("id", id);
        var result: any;
        try {
            await model?.Find();
            result = await model?.Delete();
            view?.RenderResponseData(result, ProjectViewType.DeleteProject);
        } catch (error) {
            console.error(error);
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 完成项目
     * @param args
     */
    private async OnCompleteProject(...args: any) {
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);

        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        const employee = await model?.GetEmployeeByUserId(view?.User?.id);
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("id", id);
        var result: any;
        try {
            await model?.Find();
            model?.SetFieldValue("status", 3);
            model?.SetFieldValue("complete_date", new Date(Date.now()).toLocaleString().replace(',', ''));
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
                    value: "项目归档-成功"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.UpdateProject);
        } catch (error) {
            console.error(error);
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
                    value: "项目归档-失败"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }

    /**
     * 项目归档
     * @param args
     */
    private async OnArchiveProject(...args: any) {
        const logger = this.InstantiateModel<ProcessLogModel>(ModelType.ProcessLog);

        const model = this.InstantiateModel<ProjectModel>(ModelType.Project);
        const view = this.InstantiateView<ProjectView>(ViewType.Project, args[0], args[1]);
        const requestData = view?.GetRequestData<ProjectRequestData>();
        const id = requestData?.GetParam("id");
        const employee = await model?.GetEmployeeByUserId(view?.User?.id);
        if (!id) {
            view?.RenderResponseData(null, ProjectViewType.Error);
            view?.Response();
            return;
        }
        model?.SetFieldValue("id", id);
        var result: any;
        try {
            await model?.Find();
            model?.SetFieldValue("status", 4);
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
                    value: "项目归档-成功"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.UpdateProject);
        } catch (error) {
            console.error(error);
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
                    value: "项目归档-失败"
                },
                {
                    key: "date",
                    value: new Date(Date.now()).toLocaleString().replace(',', '')
                }
            );
            logger?.Insert();
            view?.RenderResponseData(result, ProjectViewType.Error);
        }
        view?.Response();
    }
}