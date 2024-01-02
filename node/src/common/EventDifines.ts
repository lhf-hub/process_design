export class EventDefines {
    public static readonly GetClient: string = "GetClient";
    public static readonly InsertClient: string = "InsertClient";
    public static readonly UpdateClient: string = "UpdateClient";
    public static readonly DeleteClient: string = "DeleteClient";
    public static readonly GetCompanyClient: string = "GetCompanyClient";

    public static readonly FindEmployee: string = "FindEmployee";
    public static readonly GetDepartmentEmployee: string = "GetDepartmentEmployee"; // 部门-主管-员工，级联的所有信息
    public static readonly Insert: string = "Insert"; // 插入员工/主管
    public static readonly Update: string = "Update"; // 更新员工/主管信息
    public static readonly Delete: string = "Delete"; // 删除员工/主管
}