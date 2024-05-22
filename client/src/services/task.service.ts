import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { axiosWithAuth } from '@/api/interceptors'
import {ITimeTaskSpentResponse} from "../types/time-task-spent.types";

class TaskService {
    private BASE_URL = '/user/tasks'
    private BASE_URL_TASK_TIME = '/user/tasks-spent-time'

    async getTasks() {
        const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
        return response
    }

    async createTask(data: TypeTaskFormState) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response
    }

    async updateTask(id: string, data: TypeTaskFormState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
        return response
    }

    async deleteTask(id: string) {
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)

        return response
    }

    //task timer
    async startTimeTask(id: string) {
        const response = await axiosWithAuth.post(this.BASE_URL_TASK_TIME, id)

        return response
    }

    async endTimeTask(id: string, data:ITimeTaskSpentResponse) {

        //console.log('time block id', id)
       // console.log('time block data', data)

        const response = await axiosWithAuth.put(`${this.BASE_URL_TASK_TIME}/${id}`, data)

        return response
    }
}

export const taskService = new TaskService()
