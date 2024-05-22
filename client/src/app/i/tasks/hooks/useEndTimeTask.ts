import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {taskService} from "../../../../services/task.service";
import {ITimeTaskSpentResponse} from "../../../../types/time-task-spent.types";

export function useEndTimeTask() {
	const queryClient = useQueryClient()

	const { mutate: endTimeTask,  isLoading, isError, isSuccess, data, error } = useMutation({
		mutationKey: ['_end time task'],

		mutationFn: ( {id, data}: { id: string; data: ITimeTaskSpentResponse }) => {
		//mutationFn: ({ id, data}) => {
			console.log('ID: ', id)
			console.log('DATA: ', data)

			taskService.endTimeTask(id, data)

			// taskService.endTimeTask('clwibfcpi000v135i1um58vov', {
			// 	taskId: 'clwgsit8s0000n6cgirdefmwi',
			// 	startTime : '2024-05-22T16:44:00.345Z',
			// 	endTime : '2024-05-22T16:44:00.345Z',
			// 	isCompleted: null,
			// 	additionalData : null
			// })
		},

		onSuccess() {
			queryClient.invalidateQueries({
				//queryKey: ['tasks']
			})
		}
	})


	return {endTimeTask, isLoading, isError, isSuccess, data, error }

}
