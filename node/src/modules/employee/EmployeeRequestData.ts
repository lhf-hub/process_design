import { RequestDataBase } from "../../mvc/RequestDataBase";

export class EmployeeRequestData extends RequestDataBase {
    public Init(): void {
        this.SetParams('id', 'name', 'sex', 'age', 'phone', 'e_mail', 'address', 'salary_least',
            'entry_time', 'leave_time', 'user_id', 'password', 'department_id', 'supervisor_id', 'is_regular');
    }// 所有请求数据，视情况

    // 添加主管时，需要的请求体数据为：
    // name, sex, age, phone, e_mail, address, salary_least, entry_time, leave_time, user_id, password, department_id，主管id:null

    // 添加员工时，需要的数据为：
    // name, sex, age, phone, e_mail, address, salary_least, entry_time, leave_time, user_id, password, department_id, supervisor_id, is_regular

    // 更新信息时，需要的数据为：
    // id + 需要更新的字段

    // 删除信息时，需要的数据为：
    // id

    // 查询员工信息时，需要的数据为：
    // name 模糊查询

    // 获取封装好的所有信息（部门-主管-员工）时，请求体可以为空直接获取
}