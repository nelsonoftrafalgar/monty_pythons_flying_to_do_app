import { ISketch } from '../App'
import React from 'react'

interface IContentContex {
  isVisible: boolean
  archiveList: ISketch[]
  sketches: ISketch[]
  sketchLimit: boolean
  handleCheck: (e: React.FormEvent<HTMLInputElement>) => void
  handleRate: (name: string) => (e: React.FormEvent<HTMLInputElement>) => void
  handleRemove: (name: string) => (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ContentContext = React.createContext({} as IContentContex)