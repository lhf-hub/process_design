export function Format(arg:string): string {
    return new Date(arg).toLocaleString().replace(",", "-");
}