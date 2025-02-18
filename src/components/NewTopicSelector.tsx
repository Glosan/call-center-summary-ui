import { useContext } from "react"
import { topicOptions } from "../helpers/utils"
import { DbContext } from "../App"


export default function NewTopicSelector(){
  const {selectedTopic} = useContext(DbContext)
    return (
        <div>
          <label htmlFor="topicSelector" className='block text-sm font-medium text-gray-700'>Topic:</label>
          <select name="topicSelector" onChange={(e) => selectedTopic.setTopic(e.target.value)} id="topicSelector" className='mt-1 block w-full pl-3 pr-10 md:pr-1 sm:pr-1 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
            
            {topicOptions.map((topic, index) => {
              return (
                <option key={index}>{topic}</option>
              )
            })}
          </select>
        </div>
    )
}