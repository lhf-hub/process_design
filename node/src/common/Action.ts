export class Action {
    private _action: (...args: any) => void;
    public constructor(action: (...args: any) => void) {
        this._action = action;
    }
    public async Invoke(...args: any): Promise<any> {
       return await this._action(...args);
    }
}