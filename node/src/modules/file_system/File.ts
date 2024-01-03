import FS from 'fs';
import Path from 'path';
export class File {
  public Name: string;
  public Path: string;
  private _data: Blob;
  private _buffer: Buffer;
  private _size: number;
  private _type: string;

  constructor(path: string, buffer?: Buffer) {
    this.Path = path;
    this.Name = Path.basename(path);
    if (buffer) {
      this._buffer = buffer;
    } else {
      this._buffer = FS.readFileSync(path);
    }
    this._data = new Blob([this._buffer]);
    this._size = this._data.size;
    this._type = this._data.type;
  }

  public get Data(): Blob {
    return this._data;
  }

  public get Buffer(): Buffer {
    return this._buffer;
  }

  public get Size(): number {
    return this._size;
  }

  public get Type(): string {
    return this._type;
  }
}
