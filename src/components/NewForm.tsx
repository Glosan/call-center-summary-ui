import DateRangePicker from './datePicker'
import ContactInput from './ContactInput'
import NewTopicSelector from './NewTopicSelector'
import CountrySelector from './CountrySelector'
import Unresolved from './Unresolved'
import OrderNumInput from './OrderNumInput'
import { useContext } from 'react'
import { DbContext } from '../App'
import SourceSwitcher from './SourceSwitcher'


export default function NewForm(){
    const {switcher} = useContext(DbContext)
    return (
        <form className='px-24 py-8 bg-orange-500 lg:flex gap-4 lg:justify-center '>
            <SourceSwitcher/>
            <OrderNumInput/>
            {switcher.sourceOpt !== "Chats" ? <ContactInput/>: ""}
            <NewTopicSelector/>
            <CountrySelector/>
            <DateRangePicker/>
            <Unresolved/>
        </form>
    )
}