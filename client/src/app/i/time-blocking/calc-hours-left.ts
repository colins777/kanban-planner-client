import { ITimeBlockResponse } from '@/types/time-block.types'

export function calcHoursLeft(items: ITimeBlockResponse[] | undefined) {
	const totalMinutes = items?.reduce((acc, item) => acc + item.duration, 0) || 0
	const totalHours = Math.floor(totalMinutes / 60) // check if devide is correct
	const hoursLeft = 24 - totalHours // calculate left time

	return { hoursLeft }
}
