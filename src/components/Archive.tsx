import { StoreContext } from 'store/Store'
import { Title } from 'components/Title'
import { dictionary } from 'dictionary'
import styles from 'styles/archive.module.css'
import { useContext } from 'react'

const Archive = () => {
	const { archiveList } = useContext(StoreContext)

	return (
		<div data-cy='archive' className={styles.container}>
			<Title text={dictionary.archive} />
			<ul className={styles.list}>
				{archiveList.map(({ name, date, time, rating }) => (
					<li className={styles.listItem} key={name}>
						<p className={styles.name}>{name}</p>
						<div className={styles.listItemDetails}>
							<p data-cy='archive-item-date'>
								added: {date} {time}
							</p>
							<p data-cy='archive-item-rating'>rating: {rating || 0}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Archive
