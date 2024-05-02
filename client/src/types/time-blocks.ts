import {ITaskResponse} from "./task.types";
import {IBase} from "./root.types";

//export interface ITimeBlockResponse {
export interface ITimeBlockResponse extends IBase{
   // id: string
   // createdAt?: string
   // updatedAt?: string
    name: string
    color?: string
    duration: number
    order: number
}

export type TypeTimeBlockFormState = Partial<
                                        Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
                                        >
