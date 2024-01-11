import FS from "fs";
import Path from "path";
import { File } from "./file";
export class FileOperator {
  public static WriteFile(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      FS.writeFile(file.Path, file.Buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static ReadFile(path: string): Promise<File> {
    return new Promise((resolve, reject) => {
      FS.readFile(path, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const file = new File(path);
          resolve(file);
        }
      });
    });
  }

  public static CreateDirc(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      FS.mkdir(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static DeleteFile(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      FS.unlink(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static DeleteDirc(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      FS.rmdir(path, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  public static async DeleteDircDeep(path: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      FS.readdir(path, async (err, files) => {
        if (err) {
          reject(err);
        } else {
          const deletePromises = files.map(async (file) => {
            const filePath = Path.join(path, file);
            if (FS.statSync(filePath).isDirectory()) {
              return this.DeleteDircDeep(filePath);
            } else {
              FS.unlinkSync(filePath);
              return Promise.resolve();
            }
          });
          await Promise.all(deletePromises);
          FS.rmdirSync(path);
          resolve(true);
        }
      });
    });
  }

  public static async RenameFileOrDirc(oldPath: string, newPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      FS.rename(oldPath, newPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

}