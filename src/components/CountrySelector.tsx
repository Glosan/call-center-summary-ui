import { useContext } from "react"
import { countryOptions } from "../helpers/utils"
import { DbContext } from "../App"

export default function CountrySelector(){
    const { selectedCountry } = useContext(DbContext)

    return (
        <div>
        <label htmlFor="countrySelector" className='block text-sm font-medium text-gray-700'>Country:</label>
        <select name="countrySelector" onChange={(e) => selectedCountry.setCountry(e.target.value)} id="countrySelector" className='mt-1 block w-full pl-3 pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
            {countryOptions.map((country, index) => {
              return (
                <option key={index} value={country.value}>{country.title}</option>
              )
            })}
          </select>
        </div>
    )
}