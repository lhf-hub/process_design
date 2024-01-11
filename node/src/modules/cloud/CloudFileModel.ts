import { ConnectionPool } from "../..";
import { GetConnection, Query } from "../../common/Query";
import { FileOperator } from "../file_system/FileOpreator";
import { File } from "../file_system/file";
import { CloudNodeModel } from "./CloudNodeModel";
import Path from 'path';

export class CloudFileModel extends CloudNodeModel {
    private _buffer: Buffer;
    private _file: File;

    constructor() {
        super();
    }

    override Init(): void {
        super.Init();
    }

    public async GetEmployeeByUserId(id: string): Promise<any> {
        var sql: string = `SELECT * FROM employee WHERE user_id = '${id}'`;
        try {
            var result = await Query(await GetConnection(ConnectionPool), sql);
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    /**
     * 为保证事务的一致性，创建文件节点时，需要同时创建文件或目录，请勿在外部调用此方法或单独调用此方法
     * @returns 
     */
    public async Insert(): Promise<boolean> {
        //不做异常处理，交由上层处理
        const sql = `insert into ${this.tableName} (id, parent_id, name, path, type, size, modify_date) values (?, ?, ?, ?, ?,?,?)`;
        var result;
        try {
            result = await Query(await GetConnection(ConnectionPool), sql, [
                this.GetFieldValue("id"),
                this.GetFieldValue("parent_id"),
                this.GetFieldValue("name"),
                this.GetFieldValue("path"),
                this.GetFieldValue("type"),
                this.GetFieldValue("size"),
                this.GetFieldValue("modify_date")
            ]);
            return result.affectedRows > 0;
        } catch (e) {
            throw e;
        }
    }

    /**
     * 为保证事务的一致性，创建文件时，需要同时创建文件节点，请勿单独调用此方法
     * @returns 
     */
    private async CreateFile(): Promise<void> {
        //不做异常处理，交由上层处理
        await FileOperator.WriteFile(new File(Path.join(__dirname, '../../../resources/cloud/',
            this.GetFieldValue("path"),
            this.GetFieldValue("name")), this.GetBuffer()));
    }

    /**
     * 为保证事务的一致性，创建目录时，需要同时创建文件节点，请勿单独调用此方法
     * @returns 
     */
    private async CreateDirectory(): Promise<void> {
        //不做异常处理，交由上层处理
        await FileOperator.CreateDirc(Path.join(__dirname, '../../../resources/cloud/',
            this.GetFieldValue("path"),
            this.GetFieldValue("name")));
    }

    /**
     * 创建时使用此方法
     * @returns 
     */
    public async CreateFileNodeTransaction(): Promise<boolean> {
        const connection = await GetConnection(ConnectionPool);
        return new Promise<boolean>((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    console.error(err);
                    reject(err);
                    return;
                }
                try {
                    await this.Insert();
                    await this.CreateFile();
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => { throw err; });
                        }
                        resolve(true);
                        connection.release();
                    });
                } catch (e) {
                    console.error(e);
                    connection.rollback();
                    connection.release();
                    reject(e);
                }
            });
        });
    }

    /**
     * 创建时使用此方法
     * @returns 
     */
    public async CreateDirectoryNodeTransaction(): Promise<boolean> {
        const connection = await GetConnection(ConnectionPool);
        return new Promise<boolean>((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    console.error(err);
                    reject(err);
                    return;
                }
                try {
                    await this.Insert();
                    await this.CreateDirectory();
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => { throw err; });
                        }
                        connection.release();
                        resolve(true);
                    });
                } catch (e) {
                    console.error(e);
                    connection.rollback();
                    connection.release();
                    reject(e);
                }
            });
        });
    }

    /**
     * 为保证事务的一致性，删除文件节点时，需要同时删除文件或目录，请勿在外部调用此方法或单独调用此方法
     * @returns 
     */
    public async Delete(): Promise<boolean> {
        //不做异常处理，交由上层处理
        const sql = `delete from ${this.tableName} where id = ?`;
        var result;
        try {
            result = await Query(await GetConnection(ConnectionPool), sql, [
                this.GetFieldValue("id")
            ]);
            return result.affectedRows > 0;
        } catch (e) {
            throw e;
        }
    }

    /**
     * 为保证事务的一致性，删除文件时，需要同时删除文件节点，请勿单独调用此方法
     * @returns 
     */
    private async DeleteFile(): Promise<void> {
        //不做异常处理，交由上层处理
        await FileOperator.DeleteFile(Path.join(__dirname, '../../../resources/cloud/',
            this.GetFieldValue("path"),
            this.GetFieldValue("name")));
    }

    /**
     * 为保证事务的一致性，删除目录时，需要同时删除文件节点，请勿单独调用此方法
     * @returns 
     */
    private async DeleteDirectory(): Promise<void> {
        //不做异常处理，交由上层处理
        await FileOperator.DeleteDirc(Path.join(__dirname, '../../../resources/cloud/',
            this.GetFieldValue("path"),
            this.GetFieldValue("name")));
    }

    /**
     * 删除时使用此方法
     * @returns 
     */
    public async DeleteFileNodeTransaction(): Promise<boolean> {
        const connection = await GetConnection(ConnectionPool);
        return new Promise<boolean>((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    console.error(err);
                    reject(err);
                    return;
                }
                try {
                    await this.Delete();
                    await this.DeleteFile();
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => { throw err; });
                        }
                        resolve(true);
                        connection.release();
                    });
                } catch (e) {
                    console.error(e);
                    connection.rollback();
                    connection.release();
                    reject(e);
                }
            });
        });
    }

    /**
     * 删除时使用此方法
     * @returns 
     */
    public async DeleteDirectoryNodeTransaction(): Promise<boolean> {
        const connection = await GetConnection(ConnectionPool);
        return new Promise<boolean>((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    console.error(err);
                    reject(err);
                    return;
                }
                try {
                    await this.Delete();
                    await this.DeleteDirectory();
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => { throw err; });
                        }
                        resolve(true);
                        connection.release();
                    });
                } catch (e) {
                    console.error(e);
                    connection.rollback();
                    connection.release();
                    reject(e);
                }
            });
        });
    }

    /**
     * 为保证事务的一致性，重命名文件节点时，需要同时重命名文件或目录，请勿在外部调用此方法或单独调用此方法
     */
    public async Rename(): Promise<void> {
        const sql = `update ${this.tableName} set name = ?, id = ? , modify_date = ? where id = ?`;
        const name = this.GetFieldValue("name");
        const path = this.GetFieldValue("path");
        const modify_date = this.GetFieldValue("modify_date");

        const id = this.GetFieldValue("id");
        const newId = Path.join(path, name);
        await Query(await GetConnection(ConnectionPool), sql, [
            name,
            newId,
            id,
            modify_date
        ]);
        this.SetFieldValue("id", newId);
        await this.Find();
    }

    /**
     * 为保证事务的一致性，重命名文件时，需要同时重命名文件节点，请勿单独调用此方法
     */
    public async RenameFileOrDirectory(oldName: string): Promise<void> {
        await FileOperator.RenameFileOrDirc(
            Path.join(__dirname, '../../../resources/cloud/', this.GetFieldValue("path"), oldName),
            Path.join(__dirname, '../../../resources/cloud/', this.GetFieldValue("path"), this.GetFieldValue("name"))
        );
    }

    /**
     * 重命名时使用此方法
     * @param oldName 
     * @returns 
     */
    public async RenameTransaction(oldName: string): Promise<boolean> {
        const connection = await GetConnection(ConnectionPool);
        return new Promise<boolean>((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    console.error(err);
                    reject(err);
                    return;
                }
                try {
                    await this.Rename();
                    await this.RenameFileOrDirectory(oldName);
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => { throw err; });
                        }
                        resolve(true);
                        connection.release();
                    });
                } catch (e) {
                    console.error(e);
                    connection.rollback();
                    connection.release();
                    reject(e);
                }
            });
        });
    }

    /**
     * 下载文件时使用此方法
     * @returns 
     */
    public async Download(): Promise<File> {
        return new Promise<File>(async (resolve, reject) => {
            try {
                await this.LoadFile();
                resolve(this._file);
            } catch (e) {
                reject(e);
            }
        });
    }

    public async InitProjectStructure(path: string, projectName: string): Promise<boolean> {
        const connection = await GetConnection(ConnectionPool);
        return new Promise<boolean>((resolve, reject) => {
            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    console.error(err);
                    reject(err);
                    return;
                }
                try {
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName) },
                        { key: "parent_id", value: path == "\\" ? "root" : path },
                        { key: "name", value: projectName },
                        { key: "path", value: path },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }

                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "jpg") },
                        { key: "parent_id", value: Path.join(path, projectName) },
                        { key: "name", value: "jpg" },
                        { key: "path", value: Path.join(path, projectName) },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "小样") },
                        { key: "parent_id", value: Path.join(path, projectName) },
                        { key: "name", value: "小样" },
                        { key: "path", value: Path.join(path, projectName) },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "资料") },
                        { key: "parent_id", value: Path.join(path, projectName) },
                        { key: "name", value: "资料" },
                        { key: "path", value: Path.join(path, projectName) },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "后期文件") },
                        { key: "parent_id", value: Path.join(path, projectName) },
                        { key: "name", value: "后期文件" },
                        { key: "path", value: Path.join(path, projectName) },
                        { key: "type", value: 0 }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "模型文件") },
                        { key: "parent_id", value: Path.join(path, projectName) },
                        { key: "name", value: "模型文件" },
                        { key: "path", value: Path.join(path, projectName) },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "渲染文件") },
                        { key: "parent_id", value: Path.join(path, projectName) },
                        { key: "name", value: "渲染文件" },
                        { key: "path", value: Path.join(path, projectName) },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "后期文件", "原始文件") },
                        { key: "parent_id", value: Path.join(path, projectName, "后期文件") },
                        { key: "name", value: "原始文件" },
                        { key: "path", value: Path.join(path, projectName, "后期文件") },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "模型文件", "原始模型") },
                        { key: "parent_id", value: Path.join(path, projectName, "模型文件") },
                        { key: "name", value: "原始模型" },
                        { key: "path", value: Path.join(path, projectName, "模型文件") },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "模型文件", "最终模型") },
                        { key: "parent_id", value: Path.join(path, projectName, "模型文件") },
                        { key: "name", value: "最终模型" },
                        { key: "path", value: Path.join(path, projectName, "模型文件") },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "渲染文件", "原始渲染") },
                        { key: "parent_id", value: Path.join(path, projectName, "渲染文件") },
                        { key: "name", value: "原始渲染" },
                        { key: "path", value: Path.join(path, projectName, "渲染文件") },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    this.SetAllFieldValue(
                        { key: "id", value: Path.join(path, projectName, "渲染文件", "最终渲染") },
                        { key: "parent_id", value: Path.join(path, projectName, "渲染文件") },
                        { key: "name", value: "最终渲染" },
                        { key: "path", value: Path.join(path, projectName, "渲染文件") },
                        { key: "type", value: 0 },
                        { key: "size", value: 0 },
                        { key: "modify_date", value: new Date(Date.now()).toLocaleString().replace(',', "-") }
                    );
                    await this.CreateDirectoryNodeTransaction();
                    connection.commit((err) => {
                        if (err) {
                            resolve(false);
                            return connection.rollback(() => { throw err; });
                        }
                        resolve(true);
                        connection.release();
                    });
                } catch (e) {
                    console.error(e);
                    connection.rollback();
                    try {
                        FileOperator.DeleteDircDeep(Path.join(__dirname, '../../../resources/cloud/', path, projectName));
                    } catch (e) {
                        console.error(e);
                    }
                    connection.release();
                    resolve(false);
                }
            });
        });
    }

    public SetBuffer(buffer: Buffer): void {
        this._buffer = buffer;
    }

    public GetBuffer(): Buffer {
        return this._buffer;
    }

    public async LoadFile(): Promise<void> {
        this._file = await FileOperator.ReadFile(Path.join(__dirname, '../../../resources/cloud/', this.GetFieldValue("id")));
    }

}