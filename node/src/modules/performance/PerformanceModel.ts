import { BaseModel } from "../../mvc/model/BaseModel";

export class PerformanceModel extends BaseModel {
    public override Init(): void {
        super.Init();
        this.tableName = "performance";
        this.primaryKey = "id";
        this.InitField("id", "salary", "employee_id", "date");
    }


}