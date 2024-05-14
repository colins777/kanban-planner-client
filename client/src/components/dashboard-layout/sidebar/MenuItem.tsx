import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IMenuItem } from './menu.interface'
//import styles from './MenuItem.module.scss'

export function MenuItem({ item }: { item: IMenuItem }) {

	const pathname = usePathname()

	//console.log('pathname', pathname)
	//console.log('item', item)

	return (
		<div>
			<Link
				href={item.link}
				className={'flex gap-2.5 items-center py-1.5 mt-2 px-layout transition-colors hover:bg-border rounded-lg ' + (pathname == item.link ? 'text-purple-600' : '')}
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
