import cn from 'clsx'
import {GripVertical, Loader, Pause, Play, Trash} from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
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

	const {
		startTimeTask,
		currentTimeSpentBlock,
		setCurrentTimeSpentBlock,
		endTimeTask,
		secondsLeft,
		setIsRunning,
		setSecondsLeft,
		isRunning,
	} = useTimeTaskTimer();


	//console.log('currentTimeSpentBlock', currentTimeSpentBlock)

	function triggerStartTime() {

		console.log('triggerStartTime currentTimeSpentBlock', currentTimeSpentBlock)

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

		const currentTimeBlockId = currentTimeSpentBlock.id
		//const {id} = currentTimeSpentBlock

		console.log('triggerEndTime')
		console.log('task ID: ', item.id)

		const dataModifyTimeEnd = {
			taskId: item.id,
			startTime : currentTimeSpentBlock.startTime,
			endTime : new Date().toISOString(),
			totalTime: 1111,
			isCompleted: null,
			additionalData : ''
		}

		console.log('endTimeTask dataEndTime', dataModifyTimeEnd)

		//endTimeTask(currentTimeBlockId, dataEndTime)
        endTimeTask({id: currentTimeBlockId, data: dataModifyTimeEnd });

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
				1.6 H
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

			<div className={cn(
				styles.timeSpentBlock
			)}>
				<div className='grid grid-cols-2  w-full'>
					<div>0:17 - 0:18</div>
					<div>1 min</div>
				</div>

				<div className='grid grid-cols-2  w-full'>
					<div>0:20 - 0:25</div>
					<div>5 min</div>
				</div>

				<div className='grid grid-cols-2  w-full'>
					<div>16:00 - 17:00</div>
					<div>1 hour</div>
				</div>
			</div>
		</div>
	)
}
