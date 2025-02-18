import './index.css'
import NewForm from './components/NewForm'
import DataListing from './components/DataListing'
import { createContext, useState } from 'react'

export const DbContext = createContext<any>(undefined)

export default function App() {
  const [newContact, setNewContact] = useState("")
  const [newOrderNum, setNewOrderNum] = useState("")
  const [topic, setTopic] = useState("All")
  const [country, setCountry] = useState("all")
  const [startDate, setStartDate] = useState<Date | null>(new Date("2024-04-10"))
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [unresolved, setUnresolved] = useState<boolean>(false)
  const [sourceOpt, setSourceOpt] = useState('Calls')

  return (
    <>
  <DbContext.Provider value={{ contact: {newContact, setNewContact},
                               selectedTopic: {topic, setTopic},
                               selectedCountry: {country, setCountry},
                               fromDate: {startDate, setStartDate},
                               toDate: {endDate, setEndDate},
                               unresolved: {unresolved, setUnresolved},
                               order: {newOrderNum, setNewOrderNum},
                               switcher: {sourceOpt, setSourceOpt}}}>
      <NewForm/>
      <DataListing/> 
  </DbContext.Provider>
       
    </>
  )
}