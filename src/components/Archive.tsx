import { Title } from 'components/Title'
import { dictionary } from 'dictionary'
import styles from 'styles/archive.module.css'
import { useStore } from 'store/Store'

const Archive = () => {
	const { archiveList } = useStore()

	return (
		<div data-cy='archive' className={styles.container}>
			<Title text={dictionary.archive} />
			<ul className={styles.list}>
				{archiveList.map(({ name, date, time, rating }) => (
					<li className={styles.listItem} key={name}>
						<p>{name}</p>
						<div className={styles.listItemDetails}>
							<p data-cy='archive-item-date'>
								{dictionary.added}: {date} {time}
							</p>
							<p data-cy='archive-item-rating'>
								{dictionary.rating}: {rating || 0}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Archive
