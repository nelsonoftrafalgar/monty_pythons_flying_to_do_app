import Archive from 'components/Archive'
import List from 'components/List'
import { StoreContext } from 'store/Store'
import styles from 'styles/content.module.css'
import { useContext } from 'react'

const Content = () => {
	const { isVisible } = useContext(StoreContext)
	return <div className={styles.container}>{isVisible ? <Archive /> : <List />}</div>
}

export default Content
