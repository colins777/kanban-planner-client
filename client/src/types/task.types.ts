import {IBase} from "./root.types";

export enum EnumTaskPriority {
    low = 'low',
    medium = 'medium',
    high = 'high'
}


export interface ITaskResponse extends IBase{
    // id: string,
    // createdAt?: string
    // updatedAt?: string
    name: string
    priority?: EnumTaskPriority,
    isCompleted: boolean
}

//Omit crop fields 'id' | 'updatedAt' from response
//Partial set all not required
export type TypeTaskFormsState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
