import { FC } from 'react'
import styles from 'styles/statItem.module.css'

interface IProps {
	text: string
	value: number
}

const StatItem: FC<IProps> = ({ text, value }) => (
	<p data-cy='stat-item' className={styles.item}>
		{text}: <span>{value}</span>
	</p>
)

export default StatItem
