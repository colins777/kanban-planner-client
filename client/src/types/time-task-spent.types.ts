import {ITimeBlockResponse} from "./time-block.types";
import {IBase} from "./root.types";

export interface ITimeTaskSpentResponse extends IBase {
   // id: string
   // createdAt?: string
   // updatedAt?: string
    taskId: string
    startTime: string
    endTime: string,
    totalTime?: number,
    isCompleted?: boolean,
    additionalData? : string
}


//types for forms
export type TypeTimerSessionState = Partial<
    Omit<ITimeTaskSpentResponse, 'id' | 'createdAt' | 'updatedAt'>
    >

export type TypeTimerRoundState = Partial<
    Omit<ITimeTaskSpentResponse, 'id' | 'createdAt' | 'updatedAt'>
    >
