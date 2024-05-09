import { GlobalLoader } from './GlobalLoader'
import { DashboardProfile } from './profile/DashboardProfile'

export function DashboardHeader() {
	return (
		<header>
			<GlobalLoader />
			<DashboardProfile />
		</header>
	)
}
