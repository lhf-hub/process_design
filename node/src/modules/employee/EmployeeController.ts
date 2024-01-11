import { format } from "mysql";
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
import { DepartmentModel } from "./DepartmentModel";
import { EmployeeModel } from "./EmployeeModel";
import { EmployeeRequestData } from "./EmployeeRequestData";
import { EmployeeView } from "./EmployeeView";
import { UserModel } from "./UserModel";
import { nanoid } from "nanoid";
import { Format } from "../../common/format";

export class EmployeeController extends BaseController {
    public override InitEvent(): void {
        this.Register(EventDefines.FindEmployee, new Action(this.FindEmployee.bind(this)));
        this.Register(EventDefines.GetDepartmentEmployee, new Action(this.GetDepartmentEmployee.bind(this)));
        this.Register(EventDefines.Insert, new Action(this.Insert.bind(this)));
        this.Register(EventDefines.Update, new Action(this.Update.bind(this)));
        this.Register(EventDefines.Delete, new Action(this.Delete.bind(this)));
    }

    public override InitModel(): void {
        MVCApp.ModelManager.Register(ModelType.EmployeeModel, new ModelInfo(
            ModelType.EmployeeModel,
            this,
            EmployeeModel
        ));
        MVCApp.ModelManager.Register(ModelType.DepartmentModel, new ModelInfo(
            ModelType.DepartmentModel,
            this,
            DepartmentModel
        ));
        MVCApp.ModelManager.Register(ModelType.UserModel, new ModelInfo(
            ModelType.UserModel,
            this,
            UserModel
        ));
    }

    public override InitView(): void {
        MVCApp.ViewManager.Register(ViewType.EmployeeView, new ViewInfo(
            ViewType.EmployeeView,
            this,
            EmployeeView
        ));
    }

    private async Insert(...args: any): Promise<any> { //添加员工，id自动生成，离职日期自动填充为null
        // 分两种情况，一种是添加主管，一种是添加普通员工
        var view = this.InstantiateView<EmployeeView>(ViewType.EmployeeView, args[0], args[1]);
        var model = this.InstantiateModel<EmployeeModel>(ModelType.EmployeeModel);
        var userModel = this.InstantiateModel<UserModel>(ModelType.UserModel);
        var result = false;
        try {
            var id = nanoid();
            model?.SetFieldValue("id", id);
            model?.SetFieldValue("name", view?.GetRequestData<EmployeeRequestData>()?.GetParam("name"));
            model?.SetFieldValue("sex", view?.GetRequestData<EmployeeRequestData>()?.GetParam("sex"));
            model?.SetFieldValue("age", view?.GetRequestData<EmployeeRequestData>()?.GetParam("age"));
            model?.SetFieldValue("phone", view?.GetRequestData<EmployeeRequestData>()?.GetParam("phone"));
            model?.SetFieldValue("e_mail", view?.GetRequestData<EmployeeRequestData>()?.GetParam("e_mail"));
            model?.SetFieldValue("address", view?.GetRequestData<EmployeeRequestData>()?.GetParam("address"));
            model?.SetFieldValue("salary_least", view?.GetRequestData<EmployeeRequestData>()?.GetParam("salary_least"));
            model?.SetFieldValue("entry_time", view?.GetRequestData<EmployeeRequestData>()?.GetParam("entry_time"));
            model?.SetFieldValue("leave_time", null);
            model?.SetFieldValue("department_id", view?.GetRequestData<EmployeeRequestData>()?.GetParam("department_id"));
            userModel?.SetFieldValue("id", view?.GetRequestData<EmployeeRequestData>()?.GetParam("user_id"));
            userModel?.SetFieldValue("password", view?.GetRequestData<EmployeeRequestData>()?.GetParam("password"));
            try {
                model?.SetFieldValue("user_id", view?.GetRequestData<EmployeeRequestData>()?.GetParam("user_id"));
            } catch (err) {
                console.log(err);
                result = false;
            }
            if (view?.GetRequestData<EmployeeRequestData>()?.GetParam("supervisor_id") === null) { // 主管,主管id直接复用id，,is_regular为1
                model?.SetFieldValue("supervisor_id", id);
                model?.SetFieldValue("is_regular", "1");
            }
            else { // 普通员工
                model?.SetFieldValue("supervisor_id", view?.GetRequestData<EmployeeRequestData>().GetParam("supervisor_id"));
                model?.SetFieldValue("is_regular", view?.GetRequestData<EmployeeRequestData>()?.GetParam("is_regular"));
            }
            var connection = await GetConnection(ConnectionPool);
            try {
                // 开始一个新的事务
                connection.beginTransaction();
                // 在事务中执行插入操作
                const userResult = await userModel?.Insert();
                const modelResult = await model?.Insert();

                // 如果两个插入操作都成功，那么提交事务
                if (userResult && modelResult) {
                    connection.commit();
                    result = true;
                } else {
                    result = false;
                }
            } catch (error) {
                // 如果任何一个插入操作失败，那么回滚事务
                connection.rollback();
                result = false;
            } finally {
                connection.release();
            }

        } catch (err) {
            console.log(err);
            result = false;
        }
        view?.RenderResponseData(result);
        view?.Response();
    }


    private async FindEmployee(...args: any): Promise<any> { // 查询员工信息根据姓名模糊查询
        var view = this.InstantiateView<EmployeeView>(ViewType.EmployeeView, args[0], args[1]);
        var model = this.InstantiateModel<EmployeeModel>(ModelType.EmployeeModel);
        var departmentModel = this.InstantiateModel<DepartmentModel>(ModelType.DepartmentModel);
        var userModel = this.InstantiateModel<UserModel>(ModelType.UserModel);
        try {
            var data = await model?.GetEmployee(view?.GetRequestData<EmployeeRequestData>()?.GetParam("name") as string);
            var result = data?.map(async (item: any) => {
                // console.log(item);
                userModel?.SetFieldValue("id", item.user_id);
                await userModel?.Find();
                departmentModel?.SetFieldValue("id", item.department_id);
                await departmentModel?.Find();
                model?.SetFieldValue("id", item.supervisor_id);
                await model?.Find();
                return {
                    id: item.id,
                    name: item.name,
                    sex: item.sex,
                    age: item.age,
                    phone: item.phone,
                    e_mail: item.e_mail,
                    address: item.address,
                    salary_least: item.salary_least,
                    entry_time: Format(item.entry_time),
                    leave_time: item.leave_time,
                    user_id: item.user_id,
                    password: userModel?.GetFieldValue("password"),
                    department_name: departmentModel?.GetFieldValue("name"),
                    supervisor_name: model?.GetFieldValue("name"),
                    is_regular: item.is_regular
                }
            });
            // console.log(result);
            result = await Promise.all(result);
        }
        catch (err) {
            // console.log(err);
            result = undefined;
        }
        view?.RenderResponseData(result, "GetEmployee");
        view?.Response();
    }

    private async GetDepartmentEmployee(...args: any): Promise<any> { // 获取封装好的所有信息（部门-主管-员工）
        var view = this.InstantiateView<EmployeeView>(ViewType.EmployeeView, args[0], args[1]);
        var departmentModel = this.InstantiateModel<DepartmentModel>(ModelType.DepartmentModel);
        var model = this.InstantiateModel<EmployeeModel>(ModelType.EmployeeModel);
        var userModel = this.InstantiateModel<UserModel>(ModelType.UserModel);
        var result: any[] | undefined = [];
        try {
            var departmentList = await departmentModel?.GetDepartment("");
            for (let item1 of departmentList) {
                var department = {
                    id: item1.id,
                    name: item1.name,
                    supervisor: [] as any
                }
                let supervisorList = await model?.GetSupervisorByDepartmentId(item1.id);
                for (let item2 of supervisorList) {
                    var supervisor = {
                        id: item2.id,
                        name: item2.name,
                        employee: [] as any
                    }
                    let employeeList = await model?.GetEmployeeBySupervisorId(item2.id);
                    for (let item3 of employeeList) {
                        userModel?.SetFieldValue("id", item3.user_id);
                        await userModel?.Find();
                        var employee = {
                            id: item3.id,
                            name: item3.name,
                            sex: item3.sex,
                            age: item3.age,
                            phone: item3.phone,
                            e_mail: item3.e_mail,
                            address: item3.address,
                            salary_least: item3.salary_least,
                            entry_time: Format(item3.entry_time),
                            leave_time: item3.leave_time,
                            supervisor_id: item3.supervisor_id,
                            department_id: item3.department_id,
                            user_id: item3.user_id,
                            password: userModel?.GetFieldValue("password"),
                            is_regular: item3.is_regular
                        }
                        supervisor.employee.push(employee);
                    }
                    department.supervisor.push(supervisor);
                }
                result.push(department);
            }
        }
        catch (err) {
            console.log(err);
            result = undefined;
        }
        view?.RenderResponseData(result, "GetDepartmentEmployee");
        view?.Response();
    }

    private async Update(...args: any): Promise<any> { // 更新员工信息
        var view = this.InstantiateView<EmployeeView>(ViewType.EmployeeView, args[0], args[1]);
        var model = this.InstantiateModel<EmployeeModel>(ModelType.EmployeeModel);
        var userModel = this.InstantiateModel<UserModel>(ModelType.UserModel);
        var result = false;
        try {
            model?.SetFieldValue("id", view?.GetRequestData<EmployeeRequestData>()?.GetParam("id"));
            await model?.Find();
            model?.SetFieldValue("name", view?.GetRequestData<EmployeeRequestData>()?.GetParam("name") ?? model?.GetFieldValue("name"));
            model?.SetFieldValue("sex", view?.GetRequestData<EmployeeRequestData>().GetParam("sex") ?? model.GetFieldValue("sex"));
            model?.SetFieldValue("age", view?.GetRequestData<EmployeeRequestData>().GetParam("age") ?? model.GetFieldValue("age"));
            model?.SetFieldValue("phone", view?.GetRequestData<EmployeeRequestData>().GetParam("phone") ?? model.GetFieldValue("phone"));
            model?.SetFieldValue("e_mail", view?.GetRequestData<EmployeeRequestData>().GetParam("e_mail") ?? model.GetFieldValue("e_mail"));
            model?.SetFieldValue("address", view?.GetRequestData<EmployeeRequestData>().GetParam("address") ?? model.GetFieldValue("address"));
            model?.SetFieldValue("salary_least", view?.GetRequestData<EmployeeRequestData>().GetParam("salary_least") ?? model.GetFieldValue("salary_least"));
            model?.SetFieldValue("entry_time", view?.GetRequestData<EmployeeRequestData>().GetParam("entry_time") ?? model.GetFieldValue("entry_time"));
            // model?.SetFieldValue("leave_time", view?.GetRequestData<EmployeeRequestData>().GetParam("leave_time") ?? model.GetFieldValue("leave_time"));
            model?.SetFieldValue("department_id", view?.GetRequestData<EmployeeRequestData>().GetParam("department_id") ?? model.GetFieldValue("department_id"));
            model?.SetFieldValue("supervisor_id", view?.GetRequestData<EmployeeRequestData>().GetParam("supervisor_id") ?? model.GetFieldValue("supervisor_id"));
            model?.SetFieldValue("is_regular", view?.GetRequestData<EmployeeRequestData>().GetParam("is_regular") ?? model.GetFieldValue("is_regular"));
            userModel?.SetFieldValue("id", model?.GetFieldValue("user_id"));
            await userModel?.Find();
            userModel?.SetFieldValue("password", view?.GetRequestData<EmployeeRequestData>().GetParam("password") ?? userModel.GetFieldValue("password"));
            var connection = await GetConnection(ConnectionPool);
            try {
                // 开始一个新的事务
                connection.beginTransaction();
                // 在事务中执行插入操作
                const userResult = await userModel?.Update();
                const modelResult = await model?.Update();

                // 如果两个插入操作都成功，那么提交事务
                if (userResult && modelResult) {
                    connection.commit();
                    result = true;
                } else {
                    console.log('Update failed');
                }
            } catch (error) {
                // 如果任何一个插入操作失败，那么回滚事务
                connection.rollback();
                console.log(error);
            } finally {
                connection.release();
            }
        } catch (err) {
            console.log(err);
        }
        view?.RenderResponseData(result);
        view?.Response();
    }

    private async Delete(...args: any): Promise<any> { // 删除员工信息：给他的离职日期赋值
        var view = this.InstantiateView<EmployeeView>(ViewType.EmployeeView, args[0], args[1]);
        var model = this.InstantiateModel<EmployeeModel>(ModelType.EmployeeModel);
        var result = false;
        try {
            model?.SetFieldValue("id", view?.GetRequestData<EmployeeRequestData>()?.GetParam("id"));
            await model?.Find();
            model?.SetFieldValue("leave_time", new Date(Date.now()).toLocaleString().replace(",", '-'));
            result = await model?.Update() as boolean;
        } catch (err) {
            console.log(err);
        }
        view?.RenderResponseData(result);
        view?.Response();
    }

}