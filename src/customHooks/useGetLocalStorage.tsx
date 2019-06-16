import { Dispatch } from '../state/types'
import { useEffect } from "react"

export const useGetLocalStorage = (getLocalStorage: Dispatch) => {
  useEffect(() => {
    const sketches = JSON.parse(localStorage.getItem("sketches") as string)
    const archive = JSON.parse(localStorage.getItem("archive") as string)
    const globalState = JSON.parse(localStorage.getItem("globalState") as string)
    if (sketches) {
      getLocalStorage({ type: 'GET-LOCAL-STORAGE', payload: { sketches, archive, globalState } })
    }
  }, [getLocalStorage])
}
