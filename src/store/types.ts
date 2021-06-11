import { FormEvent, MouseEvent } from 'react'

import { ActionType } from 'store/actions'

export type TDispatch = (value: TAction) => void
export type TFormInputEvent = (e: FormEvent<HTMLInputElement>) => void
export type TFormSelectEvent = (e: FormEvent<HTMLSelectElement>) => void
export type ButtonEvent = (e: MouseEvent<HTMLButtonElement>) => void

export interface ISketch {
	name: string
	checked: boolean
	date: string
	time: string
	rating: string
}

export interface IArchive {
	isVisible: boolean
	archiveList: ISketch[]
}

export interface IGlobalSate {
	addedSketches: number
	sketchLimit: boolean
	watchedSketches: number
	sortBy: string
}

export interface IStore {
	globalState: IGlobalSate
	sketches: ISketch[]
	archive: IArchive
}

type TAddSketch = {
	type: ActionType.ADD_SKETCH
	payload: ISketch
}

type TUndoAddSketch = {
	type: ActionType.UNDO_ADD_SKETCH
}

type TRemoveSketch = {
	type: ActionType.REMOVE_SKETCH
	payload: ISketch[]
}

type TClearSketches = {
	type: ActionType.CLEAR_SKETCHES
}

type TSetSketchLimit = {
	type: ActionType.SET_SKETCH_LIMIT
	payload: boolean
}

type TCheckSketch = {
	type: ActionType.CHECK_SKETCH
	primaryPayload: number
	secondaryPayload: ISketch[]
}

type TAddToArchive = {
	type: ActionType.ADD_TO_ARCHIVE
	payload: ISketch[]
}

type TToggleArchive = {
	type: ActionType.TOGGLE_ARCHIVE
	payload: boolean
}

type TRateSketch = {
	type: ActionType.RATE_SKETCH
	payload: ISketch[]
}

type TMasterReset = {
	type: ActionType.MASTER_RESET
	payload: IStore
}

type TArchiveSort = {
	type:
		| ActionType.SORT_DATE_ASC
		| ActionType.SORT_DATE_DESC
		| ActionType.SORT_RATE_ASC
		| ActionType.SORT_RATE_DESC
}

type TGetLocalStorage = {
	type: ActionType.GET_LOCAL_STORAGE
	payload: IStore
}

export type TAction =
	| TAddSketch
	| TUndoAddSketch
	| TClearSketches
	| TSetSketchLimit
	| TCheckSketch
	| TRemoveSketch
	| TAddToArchive
	| TToggleArchive
	| TRateSketch
	| TMasterReset
	| TArchiveSort
	| TGetLocalStorage
