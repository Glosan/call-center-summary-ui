import { useContext } from "react";
import { DbContext } from "../App";

export default function Unresolved(){
    const { unresolved } = useContext(DbContext)
    const handleClick = () => {
        unresolved.setUnresolved(!unresolved.unresolved)
    }



    return (
        <button
          type="button"
          onClick={handleClick}
          className={`h-9 px-4 py-2 mt-6 font-medium text-sm rounded-md ${
            unresolved.unresolved ? 'bg-green-500 text-white' : ' bg-white text-gray-700'
          } focus:outline-none`}
        >
          Unresolved
        </button>
      );
}