'use client'
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { INetworkMetadata, ITokenMetadata } from '@token-icons/core'
import { filterAndSortIcons } from '../utils'

export interface AppContextType {
  type: 'tokens' | 'networks'
  setType: React.Dispatch<React.SetStateAction<'tokens' | 'networks'>>
  tokenIcons: ITokenMetadata[] | INetworkMetadata[]
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  variant: 'mono' | 'branded'
  setVariant: React.Dispatch<React.SetStateAction<'mono' | 'branded'>>
  size: number
  setSize: React.Dispatch<React.SetStateAction<number>>
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
  selectedIcons: string[]
  setSelectedIcons: React.Dispatch<React.SetStateAction<string[]>>
  loadMoreIcons: () => void
}

interface AppContextProviderProps {
  children: ReactNode
}
const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}: AppContextProviderProps) => {
  const PER_PAGE = 96
  const [type, setType] = useState<'tokens' | 'networks'>('tokens')
  const [variant, setVariant] = useState<'mono' | 'branded'>('mono')
  const [size, setSize] = useState(64)
  const [color, setColor] = useState('#FFFFFF')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIcons, setSelectedIcons] = useState<string[]>([])
  const [nextBatchIndex, setNextBatchIndex] = useState(0)
  const [shownIcons, setShownIcons] = useState<
    ITokenMetadata[] | INetworkMetadata[]
  >([])

  const loadMoreIcons = useCallback(() => {
    setShownIcons(
      filterAndSortIcons(variant, searchTerm, type, nextBatchIndex, PER_PAGE),
    )
    setNextBatchIndex((prevIndex) => prevIndex + PER_PAGE)
  }, [])

  return (
    <AppContext.Provider
      value={{
        type,
        setType,
        tokenIcons: shownIcons,
        searchTerm,
        setSearchTerm,
        variant,
        setVariant,
        size,
        setSize,
        selectedIcons,
        setSelectedIcons,
        loadMoreIcons,
        color,
        setColor,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}

export default AppContextProvider
