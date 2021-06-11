import { ButtonEvent } from 'store/types'
import { FC } from 'react'
import styles from 'styles/button.module.css'

interface IProps {
	critical?: boolean
	text: string
	handler: ButtonEvent | (() => ButtonEvent)
}

const Button: FC<IProps> = ({ handler, text, critical }) => {
	return (
		<button
			data-cy={critical ? 'button-critical' : 'button'}
			className={critical ? styles.buttonCritical : styles.button}
			onClick={handler}
		>
			{text}
		</button>
	)
}

export default Button
