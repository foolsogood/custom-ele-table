declare class Tools {
    convert2Zero(a: any): any;
    floatAdd(a: number, b: number): string;
    floatMul(a: number, b: number): number;
    floatDiv(a: number, b: number): number;
    deepCopy<T>(obj1: T): T;
    throttle(fn: () => void, delay: number): (...args: any) => void;
    guid(): string;
    checkIfObjectEqual(objA: any, objB: any): boolean;
}
declare const getTool: Tools;
export default getTool;
