import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {taskService} from "../../../../services/task.service";


export function useEndTimeTask() {
	const queryClient = useQueryClient()

	const { mutate: endTimeTask } = useMutation({
		mutationKey: ['start time task'],
		mutationFn: (data) => taskService.endTimeTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				//queryKey: ['tasks']
			})
		}
	})


	return endTimeTask

}
