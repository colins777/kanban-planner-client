import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ITaskResponse } from '@/types/task.types'
import { taskService } from '@/services/task.service'

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks(),
		//updating settings
		// staleTime: 0,
		// cacheTime: 0,
		// refetchOnMount: true,
		// refetchOnWindowFocus: true
	})

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data)

	useEffect(() => {
		setItems(data?.data)
	}, [data?.data])

	return { items, setItems }
}
