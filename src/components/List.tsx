import Button from 'components/Button'
import { Title } from 'components/Title'
import { dictionary } from 'dictionary'
import styles from 'styles/list.module.css'
import { useStore } from 'store/Store'

const List = () => {
	const { sketches, handleCheck, handleRemove, sketchLimit, handleRate } = useStore()

	return (
		<div data-cy='list' className={styles.container}>
			<Title text={dictionary.sketchList} />
			<ul>
				{sketches.map(({ name, checked, rating }, i) => {
					return (
						<li className={styles.listItem} key={`${name} ${i}`}>
							<span className={styles.sketchName}>{name}</span>
							<div className={styles.listControls}>
								<label className={styles.listLabel}>
									watched
									<input
										className={styles.checkbox}
										type='checkbox'
										value={name}
										checked={checked}
										onChange={handleCheck}
									/>
								</label>
								<label className={styles.ratingLabel}>
									rating
									<select
										data-cy='rating-select'
										value={rating}
										className={styles.numberSelect}
										onChange={handleRate(name)}
									>
										{Array.from(Array(10).keys()).map((key: number) => {
											return (
												<option key={key} value={key.toString()}>
													{key}
												</option>
											)
										})}
									</select>
								</label>
								<Button
									handler={handleRemove(name)}
									text={checked ? dictionary.addToArchive : dictionary.remove}
								/>
							</div>
						</li>
					)
				})}
			</ul>
			{sketchLimit && (
				<p data-cy='sketch-limit-message' className={styles.limitMessage}>
					{dictionary.sketchLimitMessage}
				</p>
			)}
		</div>
	)
}

export default List
