import { ActionType } from 'store/actions'
import SortOption from 'components/SortOption'
import { Title } from 'components/Title'
import { dictionary } from 'dictionary'
import styles from 'styles/sortSection.module.css'
import { useStore } from 'store/Store'

const SortSection = () => {
	const { sortBy, handleSort } = useStore()

	return (
		<div className={styles.container}>
			<Title text={dictionary.archiveSort} />
			<SortOption
				value={ActionType.SORT_DATE_ASC}
				sortBy={sortBy}
				handler={handleSort}
				text={dictionary.dateAscending}
			/>
			<SortOption
				value={ActionType.SORT_DATE_DESC}
				sortBy={sortBy}
				handler={handleSort}
				text={dictionary.dateDescending}
			/>
			<SortOption
				value={ActionType.SORT_RATE_ASC}
				sortBy={sortBy}
				handler={handleSort}
				text={dictionary.rateAscending}
			/>
			<SortOption
				value={ActionType.SORT_RATE_DESC}
				sortBy={sortBy}
				handler={handleSort}
				text={dictionary.rateDescending}
			/>
		</div>
	)
}

export default SortSection
