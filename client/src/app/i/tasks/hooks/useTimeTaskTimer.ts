import { useEffect, useState } from 'react'
import {useStartTimeTask} from "./useStartTimeTask";
import {useEndTimeTask} from "./useEndTimeTask";

export function useTimeTaskTimer() {

	const { startTimeTask, currentTimeSpentBlock, setCurrentTimeSpentBlock, isLoading: isLoadingStart } = useStartTimeTask();
	const {endTimeTask} = useEndTimeTask();

	const [isRunning, setIsRunning] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(0)

	const [serviceWorkerReady, setServiceWorkerReady] = useState(false);

	/*useEffect(() => {
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
	}, [isRunning, secondsLeft])*/

	useEffect(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then(() => {
				setServiceWorkerReady(true);
			});
		}
	}, [serviceWorkerReady])

	//Get data from service worker
	useEffect(() => {

		console.log('isRunning', isRunning)

		if (isRunning) {
			//startTimer()
			//setServiceWorkerReady(true);

			if ('serviceWorker' in navigator) {

				navigator.serviceWorker.controller.postMessage({ type: 'START_TIMER' });

				navigator.serviceWorker.addEventListener('message', event => {
					if (event.data && event.data.type === 'TIME_LEFT') {

						console.log('TICK!!!', event.data)
						setSecondsLeft(event.data.secondsLeft)
					}
				});
			}

		} else {
		//	setSecondsLeft(endTimer())
			navigator.serviceWorker.controller.postMessage({ type: 'STOP_TIMER' });
		}

	}, [isRunning, secondsLeft])

	// useEffect(() => {
	//
	// 		if (isRunning) {
	// 			navigator.serviceWorker.controller.postMessage({ type: 'START_TIMER' });
	// 		} else {
	// 			navigator.serviceWorker.controller.postMessage({ type: 'STOP_TIMER' });
	// 		}
	// }, [isRunning]);

	return {
		startTimeTask,
		currentTimeSpentBlock,
		setCurrentTimeSpentBlock,
		endTimeTask,
		secondsLeft,
		setIsRunning,
		setSecondsLeft,
		isRunning
	}
}
