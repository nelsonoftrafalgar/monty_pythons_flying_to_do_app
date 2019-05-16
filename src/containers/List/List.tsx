import { ISketch } from '../../App'
import React from 'react'
import styles from './List.module.css'

interface IListProps {
  sketches: ISketch[]
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void
  handleRemove: (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => void
}

const List: React.FC<IListProps> = ({ sketches, handleCheck, handleRemove }) => {

  const sketchList = sketches.map((sketch: ISketch) => {
    const { name, checked } = sketch
    return (
      <li className={styles.listItem} key={name}>
        <label>
          <input type='checkbox' value={name} checked={checked} onChange={handleCheck} />
          {name}
        </label>
        <button onClick={handleRemove(name)}>Remove</button>
      </li>
    )
  })

  return (
    <div className={styles.container}>
      <ul>{sketchList}</ul>
    </div>
  )
}

export { List }
