import { FC } from 'react'
import styles from 'styles/title.module.css'

interface IProps {
	text: string
}

const Title: FC<IProps> = ({ text }) => <h2 className={styles.title}>{text}</h2>

export { Title }
