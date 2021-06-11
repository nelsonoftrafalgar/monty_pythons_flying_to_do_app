import { IStore, TAction } from './types'

import { ActionType } from 'store/actions'
import { dateToNum } from 'utils/dateToNum'

export const stateReducer = (draft: IStore, action: TAction) => {
	const { type } = action
	switch (action.type) {
		case ActionType.ADD_SKETCH:
			draft.sketches = [...draft.sketches, action.payload]
			draft.globalState.addedSketches += 1
			break
		case ActionType.REMOVE_SKETCH:
			draft.sketches = action.payload
			break
		case ActionType.ADD_TO_ARCHIVE:
			draft.archive.archiveList = action.payload
			break
		case ActionType.TOGGLE_ARCHIVE:
			draft.archive.isVisible = action.payload
			break
		case ActionType.UNDO_ADD_SKETCH:
			draft.sketches = draft.sketches.filter((_, i) => i !== draft.sketches.length - 1)
			break
		case ActionType.CLEAR_SKETCHES:
			draft.sketches = []
			break
		case ActionType.SET_SKETCH_LIMIT:
			draft.globalState.sketchLimit = action.payload
			break
		case ActionType.CHECK_SKETCH:
			draft.globalState.watchedSketches = action.primaryPayload
			draft.sketches = action.secondaryPayload
			break
		case ActionType.RATE_SKETCH:
			draft.sketches = action.payload
			break
		case ActionType.MASTER_RESET:
			return action.payload
		case ActionType.SORT_DATE_ASC:
			draft.globalState.sortBy = type
			draft.archive.archiveList = draft.archive.archiveList.sort(
				(a, b) => dateToNum(a.date, a.time) - dateToNum(b.date, b.time)
			)
			break
		case ActionType.SORT_DATE_DESC:
			draft.globalState.sortBy = type
			draft.archive.archiveList = draft.archive.archiveList.sort(
				(a, b) => dateToNum(b.date, b.time) - dateToNum(a.date, a.time)
			)
			break
		case ActionType.SORT_RATE_ASC:
			draft.globalState.sortBy = type
			draft.archive.archiveList = draft.archive.archiveList.sort((a, b) => +a.rating - +b.rating)
			break
		case ActionType.SORT_RATE_DESC:
			draft.globalState.sortBy = type
			draft.archive.archiveList = draft.archive.archiveList.sort((a, b) => +b.rating - +a.rating)
			break
		case ActionType.GET_LOCAL_STORAGE:
			return action.payload
		default:
			return draft
	}
}
