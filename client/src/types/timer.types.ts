import {ITimeBlockResponse} from "./time-block.types";
import {IBase} from "./root.types";

export interface ITimerRoundResponse extends IBase {
   // id: string
   // createdAt?: string
   // updatedAt?: string

    isCompleted?: boolean
    totalSeconds: number
}

export interface ITimerSessionResponse extends IBase {
   // id: string
    //createdAt?: string
    //updatedAt?: string

    isCompleted?: boolean
    rounds?: ITimerRoundResponse[]
}

//types for forms
export type TypeTimerSessionState = Partial<
    Omit<ITimerSessionResponse, 'id' | 'createdAt' | 'updatedAt'>
    >

export type TypeTimerRoundState = Partial<
    Omit<ITimerRoundResponse, 'id' | 'createdAt' | 'updatedAt'>
    >
