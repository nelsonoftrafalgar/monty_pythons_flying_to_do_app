import React from 'react'
import styles from './List.module.css'
interface IListProps {
  sketches: string[]
}

const List: React.FC<IListProps> = ({ sketches }) => {

  const sketchList = sketches.map((sketch: string) => {
    return <li key={sketch}>{sketch}</li>
  })

  return (
    <div className={styles.container}>
      <ul>{sketchList}</ul>
    </div>
  )
}

export { List }
