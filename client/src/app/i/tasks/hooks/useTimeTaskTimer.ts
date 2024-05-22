import { useEffect, useState } from 'react'
import {useStartTimeTask} from "./useStartTimeTask";
import {useEndTimeTask} from "./useEndTimeTask";

export function useTimeTaskTimer() {
	//const queryClient = useQueryClient()
	const startTimeTask = useStartTimeTask();
	const endTimeTask = useEndTimeTask()

	const [isRunning, setIsRunning] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(0)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft + 1)

				console.log('secondsLeft', secondsLeft)

			}, 1000)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft])



	return {
		startTimeTask,
		endTimeTask,
		secondsLeft,
		setIsRunning,
		setSecondsLeft,
		isRunning
	}
}
