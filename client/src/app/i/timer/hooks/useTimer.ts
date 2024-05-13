import { useEffect, useState } from 'react'

import type { ITimerRoundResponse } from '@/types/timer.types'

import type { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings()

	const [isRunning, setIsRunning] = useState(false)
	const [isBreakTime, setIsBreakTime] = useState(false)

	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
	const [activeRound, setActiveRound] = useState<ITimerRoundResponse>()

	//timer update time +1 sec every 1 sec setInterval
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		// exit if time note gone
		if (secondsLeft > 0) return

		//switch schedule and set new time of operation
		setIsBreakTime(!isBreakTime)
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
	}, [secondsLeft, isBreakTime, workInterval, breakInterval])

	return {
		activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning
	}
}
