import { useContext } from "react"
import { DbContext } from "../App"

export default function NewPhoneInput(){
    const context = useContext(DbContext)
    return (
        
        <div>
          <label htmlFor="phoneNum" className='block text-sm font-medium text-gray-700'>Order Number:</label>
          <input type="number"
                 value={context.order.newOrderNum}
                 onChange={(e) => context.order.setNewOrderNum(e.target.value)}
                 name='phoneNum'
                 className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md' />
        </div>
    )
}