import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {taskService} from "../../../../services/task.service";


export function useStartTimeTask() {
	const queryClient = useQueryClient()

	//const { startTimeTask,  isLoading, isError, isSuccess, data, error } = useMutation({
	const { mutate: startTimeTask } = useMutation({
		mutationKey: ['start time task'],
		mutationFn: (data) => taskService.startTimeTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				//queryKey: ['tasks']
			})
		}
	})


	//return {
		//startTimeTask,  isLoading, isError, isSuccess, data, error

	//}

	return startTimeTask

}
