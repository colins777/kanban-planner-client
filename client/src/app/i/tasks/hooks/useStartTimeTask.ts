import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {taskService} from "../../../../services/task.service";


export function useStartTimeTask() {

	const queryClient = useQueryClient()
	const { mutate: startTimeTask,  isLoading, isError, isSuccess, data, error } = useMutation({
		mutationKey: ['start time task'],
		mutationFn: (data) => taskService.startTimeTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				//queryKey: ['tasks']
			})
		}
	})

	const [currentTimeSpentBlock, setCurrentTimeSpentBlock] = useState()

	useEffect(() => {

		console.log('CurrentTimeSpentBlock data', data)

		setCurrentTimeSpentBlock(data?.data)
	}, [data?.data])


	return { startTimeTask, currentTimeSpentBlock, setCurrentTimeSpentBlock, isLoading, isError, isSuccess, data, error }

	//return startTimeTask

}
