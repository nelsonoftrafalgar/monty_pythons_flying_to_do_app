import { FC } from 'react'
import { TFormInputEvent } from 'store/types'
import styles from 'styles/sortOption.module.css'

interface IProps {
	value: string
	text: string
	sortBy: string
	handler: TFormInputEvent
}

const SortOption: FC<IProps> = ({ sortBy, handler, value, text }) => {
	return (
		<label className={styles.option}>
			<input
				className={styles.input}
				type='radio'
				value={value}
				checked={value === sortBy}
				onChange={handler}
			/>
			{text}
		</label>
	)
}

export default SortOption
