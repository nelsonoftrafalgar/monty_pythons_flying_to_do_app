import ButtonsSection from './components/ButtonsSection'
import Content from './components/Content'
import SortSection from './components/SortSection'
import StatsSection from './components/StatsSection'
import Store from './store/Store'
import styles from './styles/app.module.css'

const App = () => {
	return (
		<Store>
			<div className={styles.app}>
				<div className={styles.container}>
					<div className={styles['section-wrapper']}>
						<ButtonsSection />
						<StatsSection />
						<SortSection />
					</div>
					<Content />
				</div>
			</div>
		</Store>
	)
}

export default App
