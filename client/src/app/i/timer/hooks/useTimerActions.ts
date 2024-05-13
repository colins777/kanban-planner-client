import type { ITimerRoundResponse } from '@/types/timer.types'
import type { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'
import { useUpdateRound } from './useUpdateRound'

type TypeUseTimerActions = ITimerState & {
	rounds: ITimerRoundResponse[] | undefined
}

export function useTimerActions({
	activeRound,
	setIsRunning,
	secondsLeft,
	rounds,
	setActiveRound
}: TypeUseTimerActions) {
	const { workInterval } = useLoadSettings()
	const { isUpdateRoundPending, updateRound } = useUpdateRound()

	//save timer data in DB after clicked on pasue btn
	const pauseHandler = () => {
		setIsRunning(false)
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				totalSeconds: secondsLeft,
				isCompleted: Math.floor(secondsLeft / 60) >= workInterval
			}
		})
	}

	const playHandler = () => {
		setIsRunning(true)
	}

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		})
	}

	const prevRoundHandler = () => {
		// ES2023
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)
		if (!lastCompletedRound?.id) return

		updateRound({
			id: lastCompletedRound?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		})

		setActiveRound(lastCompletedRound)
	}

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler
	}
}
