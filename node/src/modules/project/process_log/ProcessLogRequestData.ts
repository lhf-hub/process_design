import { RequestDataBase } from "../../../mvc/RequestDataBase";

export class ProcessLogRequestData extends RequestDataBase {
    public constructor() {
        super();
        this.Init();
    }

    public override Init(): void {
        this.SetParams("id", "log_content", "date", "employee_id", "project_id");
    }
}