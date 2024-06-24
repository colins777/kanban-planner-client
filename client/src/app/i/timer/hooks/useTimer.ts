import { useEffect, useState } from 'react'

import type { ITimerRoundResponse } from '@/types/timer.types'
import type { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'
import {useUpdateRound} from "./useUpdateRound";

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings()

	const [isRunning, setIsRunning] = useState(false)
	const [isBreakTime, setIsBreakTime] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
	const [activeRound, setActiveRound] = useState<ITimerRoundResponse>()

	const { isUpdateRoundPending, updateRound } = useUpdateRound()

	//@TODO need to use timer from service-worker!!!!
	//timer update time +1 sec every 1 sec setInterval
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		//console.log('activeRound', activeRound)

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)

		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		if (secondsLeft == 0) {
			console.log('Round completed!!!')

			//stop timer after round is ended
			setIsRunning(false)

			//go to next round if prev round ended
			updateRound({
				id: activeRound?.id,
				data: {
					isCompleted: true,
					totalSeconds: workInterval * 60
				}
			})

			//show notification if round is ended
			if (Notification.permission === "granted") {
				new Notification("Round completed!!!")
			} else if (Notification.permission !== "denied") {
				Notification.requestPermission().then(permission => {
					if (permission === "granted") {
						new Notification("Time to break!")
					}
				})
			}
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
