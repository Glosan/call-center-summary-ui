import { useContext } from "react"
import { sourceOptions } from "../helpers/utils"
import { DbContext } from "../App"

export default function CountrySelector(){
    const { switcher } = useContext(DbContext)

    return (
        <div>
        <label htmlFor="countrySelector" className='block text-sm font-medium text-gray-700'>Source:</label>
        <select name="countrySelector" onChange={(e) => switcher.setSourceOpt(e.target.value)} id="countrySelector" className='mt-1 block pl-3 pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
            {sourceOptions.map((source, index) => {
              return (
                <option key={index} value={source}>{source}</option>
              )
            })}
          </select>
        </div>
    )
}