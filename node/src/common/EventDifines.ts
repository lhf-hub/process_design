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

    public static readonly UserLogin: string = "UserLogin"; // 用户登录
    public static readonly UserVerify: string = "UserVerify"; // 用户验证

    public static readonly CreatProject: string = "CreatProject";
    public static readonly GetAllProject: string = "GetAllProject";
    public static readonly GetProjectById: string = "GetProjectById";
    public static readonly GetProjectByName: string = "GetProjectByName";
    public static readonly UpdateProjectStatus: string = "UpdateProjectStatus";
    public static readonly GetProjectByClientId: string = "GetProjectByClientId";
    public static readonly UpdateProjectAll: string = "UpdateProjectAll";
    public static readonly DeleteProject: string = "DeleteProject";
    public static readonly GetProjectJoined: string = "GetProjectJoined";
    public static readonly CompleteProject: string = "CompleteProject";
    public static readonly ArchiveProject: string = "ArchiveProject";
    public static readonly PullSupervisor: string ="PullSupervisor";
    public static readonly UpdateProjectModelPart:string ="UpdateProjectPart";
    public static readonly UpdateProjectRenderPart:string="UpdateProjectRenderPart";
    public static readonly UpdateProjectPostProductionPart:string="UpdateProjectPostProductionPart"

    public static readonly GetAllProcessLog: string = "GetAllProcessLog";
    public static readonly GetProcessLogById: string = "GetProcessLogById";

    public static readonly CreateMission: string = "CreateMission";
    public static readonly GetAllMission: string = "GetAllMission";
    public static readonly GetMissionById: string = "GetMissionById";
    public static readonly GetMissionByName: string = "GetMissionByName";
    public static readonly GetOwnMission: string = "GetOwnMission";
    public static readonly DeleteMission: string = "DeleteMission";
    public static readonly UpdateMissionAll: string = "UpdateMissionAll";
    public static readonly UpdateMissionStatus: string = "UpdateMissionStatus";
    public static readonly CompleteMission: string = "CompleteMission";
    public static readonly UpdateMissionReceiverId: string = "UpdateMissionReceiverId";
    public static readonly AcceptMission: string = "AcceptMission";
    public static readonly RefuseMission: string = "RefuseMission";
    public static readonly InitProject:string="InitProject";

    //    this.Register(EventDefines.GetCloudNodes, new Action(this.OnGetCloudNodes.bind(this)));
    // this.Register(EventDefines.GetChildrenNodes, new Action(this.OnGetChildren.bind(this)));
    // this.Register(EventDefines.GetParentNode, new Action(this.OnGetParent.bind(this)));
    // this.Register(EventDefines.CreateCloudNode, new Action(this.OnCreateNode.bind(this)));
    // this.Register(EventDefines.DeleteCloudNode, new Action(this.OnDeleteNode.bind(this)))
    // this.Register(EventDefines.RenameCloudNode, new Action(this.OnRenameNode.bind(this)));
    // this.Register(EventDefines.DownloadFile, new Action(this.DownloadFile.bind(this)));
    // this.Register(EventDefines.InitProjectStructure, new Action(this.InitProjectStructure.bind(this)));

    public static readonly GetCloudNodes: string = "GetCloudNodes";
    public static readonly GetChildrenNodes: string = "GetChildrenNodes";
    public static readonly GetParentNode: string = "GetParentNode";
    public static readonly CreateCloudNode: string = "CreateCloudNode";
    public static readonly DeleteCloudNode: string = "DeleteCloudNode";
    public static readonly RenameCloudNode: string = "RenameCloudNode";
    public static readonly DownloadFile: string = "DownloadFile";
    public static readonly InitProjectStructure: string = "InitProjectStructure";



}