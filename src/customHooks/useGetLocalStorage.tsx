import { IArchive, IGlobalSate, ISketch } from "../App";

import { useEffect } from "react"

export type SetGlobalState = (value: React.SetStateAction<IGlobalSate>) => void
type SetSketches = (value: React.SetStateAction<ISketch[]>) => void
export type SetArchive = (value: React.SetStateAction<IArchive>) => void

export const useGetLocalStorage = (
  setGlobalState: SetGlobalState,
  setSketches: SetSketches,
  setArchive: SetArchive
) => {
  useEffect(() => {
    const getSketches = JSON.parse(localStorage.getItem("sketches") as string)
    const getArchive = JSON.parse(localStorage.getItem("archive") as string)
    const getGlobalState = JSON.parse(localStorage.getItem("globalState") as string)
    if (getSketches) {
      setGlobalState(() => getGlobalState)
      setSketches(getSketches)
      setArchive(() => getArchive)
    }
  }, [])
}
