import Button from 'components/Button'
import { StoreContext } from 'store/Store'
import { Title } from 'components/Title'
import { dictionary } from 'dictionary'
import styles from 'styles/buttonsSection.module.css'
import { useContext } from 'react'

const ButtonsSection = () => {
	const {
		handleAddSketch,
		handleArchiveToggle,
		handleUndoAddSketch,
		handleReset,
		handleClearList,
	} = useContext(StoreContext)

	return (
		<div data-cy='button-section' className={styles.container}>
			<Title text={dictionary.controlPanel} />
			<Button handler={handleAddSketch} text={dictionary.addSketch} />
			<Button handler={handleUndoAddSketch} text={dictionary.undoAddSketch} />
			<Button handler={handleClearList} text={dictionary.clearList} />
			<Button handler={handleArchiveToggle} text={dictionary.toggleArchive} />
			<Button critical={true} handler={handleReset} text={dictionary.masterReset} />
		</div>
	)
}

export default ButtonsSection
