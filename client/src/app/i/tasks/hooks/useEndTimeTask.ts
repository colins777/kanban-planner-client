import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {taskService} from "../../../../services/task.service";

export function useEndTimeTask() {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationKey: ['end time task'],
		//mutationFn: ({id, data}: {id, data}) => taskService.endTimeTask(id, data),
		mutationFn: (id, data) => taskService.endTimeTask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})


	return mutation

}
