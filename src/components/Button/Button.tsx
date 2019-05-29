import React from 'react'
import styles from './button.module.css'

type Event = (e: React.MouseEvent<HTMLButtonElement>) => void
type WithArg = () => (e: React.MouseEvent<HTMLButtonElement>) => void

interface IButton {
  critical?: boolean
  text: string
  handler: Event | WithArg
}

const Button: React.FC<IButton> = ({ handler, text, critical }) => {
  return (
    <button className={critical ? styles.buttonCritical : styles.button} onClick={handler}>{text}</button>
  )
}

export { Button }
