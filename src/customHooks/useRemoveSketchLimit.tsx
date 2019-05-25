import { ISketch } from "../App"
import { SetGlobalState } from "./useGetLocalStorage"
import { useEffect } from "react"

export const useRemoveSketchLimit = (sketches: ISketch[], setGlobalState: SetGlobalState) => {
  useEffect(() => {
    if (sketches.length < 10) {
      setGlobalState((globalState) => {
        return { ...globalState, sketchLimit: false }
      })
    }
  }, [sketches])
}