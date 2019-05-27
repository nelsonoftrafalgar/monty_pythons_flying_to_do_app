import React from 'react'

interface IControlPanelContex {
  sortBy: string
  watchedSketches: number
  addedSketches: number
  currentSketches: number
  archivedSketches: number
  handleAddSketch: () => void
  handleUndoAddSketch: () => void
  handleClearList: () => void
  handleArchiveToggle: () => void
  handleSort: (e: React.FormEvent<HTMLInputElement>) => void
  handleReset: () => void
}

export const ControlPanelContext = React.createContext({} as IControlPanelContex)