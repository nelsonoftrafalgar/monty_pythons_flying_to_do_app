import { IArchive, IGlobalSate, ISketch } from '../state/types'

import { useEffect } from "react"

export const useSetLocalStorage = (sketches: ISketch[], archive: IArchive, globalState: IGlobalSate) => {
  useEffect(() => {
    const updateStorage = () => {
      localStorage.setItem("sketches", JSON.stringify(sketches))
      localStorage.setItem("archive", JSON.stringify(archive))
      localStorage.setItem("globalState", JSON.stringify(globalState))
    }
    window.addEventListener("beforeunload", updateStorage)
    return () => {
      window.removeEventListener("beforeunload", updateStorage)
    }
  }, [sketches, archive, globalState])
}

