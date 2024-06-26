import cn from 'clsx'
import {GripVertical, Loader, Pause, Play, Trash} from 'lucide-react'
import type {Dispatch, SetStateAction} from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

import styles from './ListView.module.scss'
import {useTimeTaskTimer} from "../hooks/useTimeTaskTimer";
import {TaskSpentTimeBlock} from "../task-spent-time/TaskSpentTimeBlock";
import { LogOut } from 'lucide-react'
import {useState, useEffect} from "react";
import {useFormatSecondsToHours} from "../../../../hooks/useFormatSecondsToHours";
import {useContext} from "react";
import GlobalStateContext from "../../../../hooks/useGlobalContext";
import {TIME_IS_OUT_AUDIO_PATH} from "../../../../constants/path.constants";

interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRow({ item, setItems }: IListRow) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})


	const {userProfile} = useContext(GlobalStateContext);
	//true || false
	const {taskBlockRound} = userProfile.data.user;
	const {workInterval} = userProfile.data.user;

	//console.log('user data', userProfile.data.user)

	const {
		startTimeTask,
		currentTimeSpentBlock,
		endTimeTask,
		secondsLeft,
		setIsRunning,
		setSecondsLeft,
		isRunning,
	} = useTimeTaskTimer();

	useEffect(() => {
		setSecondsLeft(secondsLeft)

		//workInterval in DB - minutes
		if (secondsLeft == workInterval * 60 && taskBlockRound && currentTimeSpentBlock) {
		//if (secondsLeft == workInterval && taskBlockRound && currentTimeSpentBlock) {
				triggerEndTime()

				function playSound() {

				const audio = new Audio(TIME_IS_OUT_AUDIO_PATH);
				audio.play()
					.catch(error => console.error('Error playing audio:', error));
			}

			if (Notification.permission === "granted") {
				playSound()
				new Notification("Time to break!")

			} else {
				console.log('No permission')

				Notification.requestPermission().then(permission => {
					if (permission === "granted") {
						playSound()
						new Notification("Time to break!")
					}
				})
			}
		}

	}, [secondsLeft])

	const [showSpentTimeBlock, setShowSpentTimeBlock] = useState(false)


	//console.log('item', item)

	function triggerStartTime() {

		setIsRunning(true)

		const data = {
			taskId: item.id,
			startTime : new Date(),
			endTime : new Date(),
			isCompleted: null,
			additionalData : null
		}

		//@ts-ignore
		startTimeTask(data)
	}

	function triggerEndTime() {
		setIsRunning(false)
		//setSecondsLeft(0)

		const currentTimeBlockId = currentTimeSpentBlock.id
		//console.log('triggerEndTime')
		//console.log('task ID: ', item.id)

		const dataModifyTimeEnd = {
			taskId: item.id,
			startTime : currentTimeSpentBlock.startTime,
			endTime : new Date().toISOString(),
			totalTime: secondsLeft,
			isCompleted: null,
			additionalData : ''
		}

		console.log('endTimeTask dataEndTime', dataModifyTimeEnd)

		//endTimeTask(currentTimeBlockId, dataEndTime)
        endTimeTask({id: currentTimeBlockId, data: dataModifyTimeEnd });

	}

	const triggerShowTimeBlock = function() {
		setShowSpentTimeBlock(!showSpentTimeBlock)
	}

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='todo-item'>
						<GripVertical className={styles.grip} />
					</button>

					<Controller
						control={control}
						name='isCompleted'
						render={({ field: { value, onChange } }) => (
							<Checkbox
								onChange={onChange}
								checked={value}
							/>
						)}
					/>

					<TransparentField {...register('name')} />
				</span>
			</div>

			<div>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className='capitalize'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							//this should to get from backend
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>

			{/*start tracking time btn*/}
			<div className='capitalize'>
				<button
					className='mt-2 opacity-80 hover:opacity-100 transition-opacity'
					onClick={!isRunning ? () => triggerStartTime() : () => triggerEndTime()}
				>
					{isRunning ? <Pause size={20} /> : <Play size={20} />}
				</button>
			</div>


			<div className='capitalize'>
				{/*Total time task*/}
				{/*<span>{useFormatSecondsToHours(item?.totalTime ? item.totalTime : '')}</span>*/}

				<span>
					{useFormatSecondsToHours(isRunning
														? (secondsLeft ? secondsLeft : '')
														: item?.totalTime ? item.totalTime : '')}
				</span>

				{
					item.timeSpentTasks?.length &&

					<div className='top-1 right-1 justify-center flex'>
						<button
							className={cn(
								'opacity-20 hover:opacity-100 transition-opacity duration-300',
								showSpentTimeBlock ? styles.rotate270 : styles.rotate90,
								'animation-opacity'
							)}
							onClick={() => triggerShowTimeBlock()}
						>
							<LogOut size={20} />
						</button>
					</div>
				}

			</div>

			<div>
				<button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>

			{/*//Spent Time Block */}
			<div className={cn(
				styles.timeSpentBlock
			)}>

				{showSpentTimeBlock && item.timeSpentTasks && item.timeSpentTasks.map((time, index) => (
						<TaskSpentTimeBlock key={index} time={time} />
					)
				)}

			</div>
		</div>
	)
}
