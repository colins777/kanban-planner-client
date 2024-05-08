import type {ITaskResponse, TypeTaskFormsState} from "../types/task.types";

import {axiosWithAuth} from "../api/interceptors";


class TaskService {
    private BASE_URL = '/user/tasks'

    async getTasks() {
        const  response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)

        return response
    }

    async createTask(data:TypeTaskFormsState) {
        const  response = await axiosWithAuth.post(this.BASE_URL, data)

        return response

    }

    async updateTask(id:string, data: TypeTaskFormsState) {
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)

        return response
    }
}
