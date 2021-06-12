import StatItem from 'components/StatItem'
import { Title } from 'components/Title'
import { dictionary } from 'dictionary'
import styles from 'styles/statsSection.module.css'
import { useStore } from 'store/Store'

const StatsSection = () => {
	const { addedSketches, currentSketches, watchedSketches, archivedSketches } = useStore()

	return (
		<div data-cy='stats-section' className={styles.container}>
			<Title text={dictionary.stats} />
			<StatItem text={dictionary.totalAddedSketches} value={addedSketches} />
			<StatItem text={dictionary.currentlyAddedSketches} value={currentSketches} />
			<StatItem text={dictionary.watchesSketches} value={watchedSketches} />
			<StatItem text={dictionary.archivedSketches} value={archivedSketches} />
		</div>
	)
}

export default StatsSection
