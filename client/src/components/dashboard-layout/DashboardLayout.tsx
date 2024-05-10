//@TODO 1 add timer to each task for tracking time
//@TODO 2 use pomodoro lap duration while tracking time is running
//@TODO 3 set on/of for using pomodoro lap in tasks
//@TODO 4 add ring sound after pomodoro timer end
//@TODO 5 add push notification after pomodoro timer end
//@TODO 6 separate Settings blocks

import type { PropsWithChildren } from 'react'

import { DashboardHeader } from './header/DashboardHeader'
import { Sidebar } from './sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
			<Sidebar />

			<main className='p-big-layout overflow-x-hidden max-h-screen relative'>
				<DashboardHeader />
				{children}
			</main>
		</div>
	)
}
