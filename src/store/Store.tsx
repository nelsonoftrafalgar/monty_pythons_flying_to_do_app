import { ButtonEvent, ISketch, TAction, TFormInputEvent, TFormSelectEvent } from 'store/types'
import { FC, createContext, useContext, useEffect, useReducer } from 'react'

import { ActionType } from 'store/actions'
import { data } from 'db'
import { produce } from 'immer'
import { stateReducer } from 'store/reducers'
import { useLocalStorage } from 'hooks/useLocalStorage'

interface IStoreContext {
	isVisible: boolean
	archiveList: ISketch[]
	sketches: ISketch[]
	sketchLimit: boolean
	sortBy: string
	watchedSketches: number
	addedSketches: number
	currentSketches: number
	archivedSketches: number
	handleAddSketch: () => void
	handleUndoAddSketch: () => void
	handleClearList: () => void
	handleArchiveToggle: () => void
	handleSort: TFormInputEvent
	handleReset: () => void
	handleCheck: TFormInputEvent
	handleRate: (name: string) => TFormSelectEvent
	handleRemove: (name: string) => ButtonEvent
}

export const StoreContext = createContext({} as IStoreContext)

const initialState = {
	globalState: {
		addedSketches: 0,
		sketchLimit: false,
		watchedSketches: 0,
		sortBy: '',
	},
	sketches: [],
	archive: {
		isVisible: false,
		archiveList: [],
	},
}

const Store: FC = ({ children }) => {
	const [state, dispatch] = useReducer(produce(stateReducer), initialState)
	const { globalState, archive, sketches } = state
	const { watchedSketches, addedSketches, sortBy, sketchLimit } = globalState
	const { isVisible, archiveList } = archive
	const random = Math.floor(Math.random() * data.length)

	useLocalStorage(dispatch, sketches, archive, globalState)

	useEffect(() => {
		if (sketches.length < 10) {
			dispatch({ type: ActionType.SET_SKETCH_LIMIT, payload: false })
		}
	}, [sketches, dispatch])

	const handleAddSketch = () => {
		if (sketches.length === 10) {
			dispatch({ type: ActionType.SET_SKETCH_LIMIT, payload: true })
			return
		}
		const payload = {
			name: data[random],
			checked: false,
			date: '',
			time: '',
			rating: '',
		}
		dispatch({ type: ActionType.ADD_SKETCH, payload })
	}

	const handleUndoAddSketch = () => dispatch({ type: ActionType.UNDO_ADD_SKETCH })
	const handleArchiveToggle = () =>
		dispatch({ type: ActionType.TOGGLE_ARCHIVE, payload: !isVisible })
	const handleClearList = () => dispatch({ type: ActionType.CLEAR_SKETCHES })

	const handleCheck: IStoreContext['handleCheck'] = (e) => {
		const { checked, value } = e.currentTarget
		const updatedList = sketches.map((sketch) => {
			return sketch.name === value ? { ...sketch, checked } : sketch
		})
		dispatch({
			type: ActionType.CHECK_SKETCH,
			primaryPayload: checked ? watchedSketches + 1 : watchedSketches - 1,
			secondaryPayload: updatedList,
		})
	}

	const handleRemove: IStoreContext['handleRemove'] = (name) => (e) => {
		e.preventDefault()
		const updatedList = sketches.filter((sketch) => sketch.name !== name)
		const removedElement = sketches.find((sketch) => sketch.name === name)
		if (removedElement?.checked) {
			const date = new Date()
			const archivedElement = {
				...removedElement,
				date: date.toLocaleDateString(),
				time: date.toLocaleTimeString(),
			}
			dispatch({
				type: ActionType.ADD_TO_ARCHIVE,
				payload: [...state.archive.archiveList, archivedElement],
			})
		}
		dispatch({ type: ActionType.REMOVE_SKETCH, payload: updatedList })
	}

	const handleRate: IStoreContext['handleRate'] = (name) => (e) => {
		const { value: rating } = e.currentTarget
		const payload = sketches.map((sketch) =>
			sketch.name === name ? { ...sketch, rating } : sketch
		)
		dispatch({ type: ActionType.RATE_SKETCH, payload })
	}

	const handleSort: IStoreContext['handleSort'] = (e) => {
		dispatch({ type: e.currentTarget.value } as TAction)
	}

	const handleReset = () => {
		localStorage.clear()
		dispatch({ type: ActionType.MASTER_RESET, payload: initialState })
	}

	const currentSketches = sketches.length
	const archivedSketches = archiveList.length

	return (
		<StoreContext.Provider
			value={{
				handleAddSketch,
				handleUndoAddSketch,
				handleClearList,
				handleArchiveToggle,
				addedSketches,
				currentSketches,
				watchedSketches,
				handleSort,
				sortBy,
				handleReset,
				archivedSketches,
				isVisible,
				archiveList,
				sketchLimit,
				sketches,
				handleCheck,
				handleRate,
				handleRemove,
			}}
		>
			{children}
		</StoreContext.Provider>
	)
}

export default Store

export const useStore = () => useContext(StoreContext)
