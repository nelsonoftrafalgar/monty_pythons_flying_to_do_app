import { IArchive, IGlobalSate, ISketch, TDispatch } from 'store/types'

import { ActionType } from 'store/actions'
import { storageAvailable } from 'utils/storageAvailable'
import { useEffect } from 'react'

export const useLocalStorage = (
	dispatch: TDispatch,
	sketches: ISketch[],
	archive: IArchive,
	globalState: IGlobalSate
) => {
	useEffect(() => {
		if (storageAvailable('localStorage')) {
			const sketches = JSON.parse(localStorage.getItem('sketches') ?? '')
			const archive = JSON.parse(localStorage.getItem('archive') ?? '')
			const globalState = JSON.parse(localStorage.getItem('globalState') ?? '')
			if (sketches) {
				dispatch({
					type: ActionType.GET_LOCAL_STORAGE,
					payload: { sketches, archive, globalState },
				})
			}
		}
	}, [dispatch])

	useEffect(() => {
		if (storageAvailable('localStorage')) {
			const updateStorage = () => {
				localStorage.setItem('sketches', JSON.stringify(sketches))
				localStorage.setItem('archive', JSON.stringify(archive))
				localStorage.setItem('globalState', JSON.stringify(globalState))
			}
			window.addEventListener('beforeunload', updateStorage)
			return () => {
				window.removeEventListener('beforeunload', updateStorage)
			}
		}
	}, [sketches, archive, globalState])
}
