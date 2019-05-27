import { ISketch } from "../App"
import { SetArchive } from "./useGetLocalStorage"
import { useEffect } from "react"

export const useSortArchive = (setArchive: SetArchive, state: ISketch[]) => {
  useEffect(() => {
    setArchive((archive) => {
      console.log("dupa");

      return { ...archive, list: state }
    })
  }, [state])
}