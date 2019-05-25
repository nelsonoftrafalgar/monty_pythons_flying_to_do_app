import { ISketch } from '../../App'
import React from 'react'
import styles from './list.module.css'

interface IListProps {
  sketches: ISketch[]
  sketchLimit: boolean
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void
  handleRate: (name: string) => (e: React.FormEvent<HTMLInputElement>) => void
  handleRemove: (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => void
}

const List: React.FC<IListProps> = ({ sketches, handleCheck, handleRemove, sketchLimit, handleRate }) => {

  const sketchList = sketches.map((sketch) => {
    const { name, checked, rating } = sketch
    return (
      <li className={styles.listItem} key={name}>
        <label>
          Watched?
          <input type='checkbox' value={name} checked={checked} onChange={handleCheck} />
          {name}
        </label>
        <label>
          <input
            className={styles.numberInput}
            min='0'
            max='10'
            onChange={handleRate(name)}
            type='number'
            value={rating}
          />
        </label>
        <button onClick={handleRemove(name)}>{checked ? 'Add to Archive' : 'Remove'}</button>
      </li>
    )
  })


  return (
    <div className={styles.container}>
      <ul>{sketchList}</ul>
      {sketchLimit &&
        <p>That's, that's enough sketches for now lad.</p>
      }
    </div>
  )
}

export { List }
