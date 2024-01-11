import jwt from "jsonwebtoken";
export class Authorization {
    private static _instance: Authorization;
    private constructor() { }
    public static get Instance(): Authorization {
        return this._instance ?? (this._instance = new Authorization());
    }

    private readonly _accessTokenSecret = "Bwi,tMwBitsh&Sme";


    public static RenderToken(object: any): string {
        const token: string = jwt.sign(object, this.Instance._accessTokenSecret, { expiresIn: "1h" });
        return token;
    }

    public static VerifyToken(token: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            jwt.verify(token, this.Instance._accessTokenSecret, (err: any, decoded: any) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded);
            });
        });
    }
}