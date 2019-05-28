import { Dispatch, ISketch } from '../state/types'

import { useEffect } from "react"

export const useRemoveSketchLimit = (sketches: ISketch[], removeSketchLimit: Dispatch) => {
  useEffect(() => {
    if (sketches.length < 10) {
      removeSketchLimit({ type: 'SET-SKETCH-LIMIT', payload: false })
    }
  }, [sketches])
}