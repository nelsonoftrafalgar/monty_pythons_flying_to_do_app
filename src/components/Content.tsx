import Archive from 'components/Archive'
import List from 'components/List'
import styles from 'styles/content.module.css'
import { useStore } from 'store/Store'

const Content = () => {
	const { isVisible } = useStore()
	return <div className={styles.container}>{isVisible ? <Archive /> : <List />}</div>
}

export default Content
