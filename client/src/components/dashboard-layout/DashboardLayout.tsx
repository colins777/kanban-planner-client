//@TODO state managment Next.js
//https://blog.logrocket.com/guide-state-management-next-js/

//@TODO 1 use pomodoro lap duration while tracking time is running
//@TODO 2 set on/of for using pomodoro lap in tasks
//@TODO 3 add ring sound after pomodoro timer end
//@TODO 4 add push notification after pomodoro timer end
//@TODO 5 separate Settings blocks
//@TODO 6 fix sorting in Time planning page

//@TODO 7 create method for counting total time of each task
//@TODO 8 create new column total_time in sec for each task
	//update task total time after each click on pause btn

//@TODO 9 fix timer behaviour in case inactive tab.
	//https://www.reddit.com/r/reactjs/comments/useyq8/setinterval_not_working_in_the_inactive_tab/
	//https://isamatov.com/prevent-timers-stopping-javascript/
	//https://stackoverflow.com/questions/72144609/my-timer-in-reactjs-is-not-working-correctly-with-a-delay


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
