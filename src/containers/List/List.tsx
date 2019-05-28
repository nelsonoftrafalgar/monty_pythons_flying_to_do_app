import React, { useContext } from 'react'

import { Button } from '../../components/Button/Button'
import { ContentContext } from '../../context/ContentContext'
import { Title } from '../../components/Title/Title'
import styles from './list.module.css'

const List: React.FC = () => {
  const {
    sketches,
    handleCheck,
    handleRemove,
    sketchLimit,
    handleRate
  } = useContext(ContentContext)

  const sketchList = sketches.map((sketch, i) => {
    const { name, checked, rating } = sketch
    return (
      <li className={styles.listItem} key={`${name} ${i}`}>
        <span className={styles.sketchName}>{name}</span>
        <label className={styles.listLabel}>
          watched
          <input className={styles.checkbox} type='checkbox' value={name} checked={checked} onChange={handleCheck} />
        </label>
        <label className={styles.ratingLabel}>
          rating
          <input
            className={styles.numberInput}
            min='0'
            max='10'
            onChange={handleRate(name)}
            type='number'
            value={rating}
          />
        </label>
        <Button handler={handleRemove(name)} text={checked ? 'Add to Archive' : 'Remove'} />
      </li>
    )
  })


  return (
    <div className={styles.container}>
      <Title text='Sketch list' />
      <ul>{sketchList}</ul>
      {sketchLimit &&
        <p className={styles.limitMessage}>That's, that's enough sketches for now lad.</p>
      }
    </div>
  )
}

export { List }
