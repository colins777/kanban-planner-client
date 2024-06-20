import { useEffect, useState } from 'react';
import { useStartTimeTask } from "./useStartTimeTask";
import { useEndTimeTask } from "./useEndTimeTask";

export function useTimeTaskTimer() {
	const { startTimeTask, currentTimeSpentBlock, setCurrentTimeSpentBlock, isLoading: isLoadingStart } = useStartTimeTask();
	const { endTimeTask } = useEndTimeTask();

	const [isRunning, setIsRunning] = useState(false);
	const [secondsLeft, setSecondsLeft] = useState(0);

	useEffect(() => {
		console.log('isRunning', isRunning);

		if (isRunning && 'serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener('message', event => {
				if (event.data && event.data.type === 'TIME_LEFT') {
					//console.log('TICK!!!', event.data);
					setSecondsLeft(event.data.secondsLeft);
				}
			});
		}
	}, [isRunning]);

	useEffect(() => {
		const handleServiceWorkerMessage = event => {
			if (event.data) {
				switch (event.data.type) {
					case 'TIME_LEFT':
						console.log('TIME_LEFT', event.data.secondsLeft);
						setSecondsLeft(event.data.secondsLeft);
						break;
					case 'ELAPSED_TIME':
						// Handle other message types if needed
						break;
					default:
						break;
				}
			}
		};

		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

			navigator.serviceWorker.ready.then(registration => {
				if (registration.active && navigator.serviceWorker.controller) {
					// Ensure the controller is available before sending messages
					if (isRunning) {
						navigator.serviceWorker.controller.postMessage({ type: 'START_TIMER' });
					} else {
						navigator.serviceWorker.controller.postMessage({ type: 'STOP_TIMER' });
					}
				}
			});

			// Clean up the event listener on component unmount
			return () => {
				navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
			};
		}
	}, [isRunning]);

	return {
		startTimeTask,
		currentTimeSpentBlock,
		setCurrentTimeSpentBlock,
		endTimeTask,
		secondsLeft,
		setIsRunning,
		setSecondsLeft,
		isRunning
	};
}
