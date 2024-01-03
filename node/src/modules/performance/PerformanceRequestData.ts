import { RequestDataBase } from "../../mvc/RequestDataBase";

export class PerformanceRequestData extends RequestDataBase {
    public constructor() {
        super();
        this.Init();
    }

    public override Init(): void {
        this.SetParams("employee_id");
    }
}