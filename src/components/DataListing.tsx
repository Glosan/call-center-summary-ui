import { useContext, useEffect, useState } from "react";
import { DataRecord} from "../helpers/types.ts";
import axios from "axios";
import { DbContext } from "../App.tsx";
import { dataFilter, tableHead } from "../helpers/utils.tsx";


export default function DataListing(){
    const [data, setData] = useState<DataRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const context = useContext(DbContext)

    useEffect(() => {
        const dataFetch = async () => {
            const type = context.switcher.sourceOpt.toLowerCase()
            console.log(type)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const records: any = await axios.get('http://localhost:8000/', {
                params: {
                    type
                }
            });
            if (records?.response?.status != 404){
                setData(records.data)
                setLoading(false)
            }  
        }
        dataFetch();
    }, [context.switcher.sourceOpt])


    if (loading){
        return (
            <div role="status" className="w-full h-5, flex justify-center items-center p-4">
                <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            )
    }
    const filtred = data.filter(obj => dataFilter(obj, context.contact.newContact, context.selectedTopic.topic, context.selectedCountry.country, context.fromDate.startDate, context.toDate.endDate, context.unresolved.unresolved, context.order.newOrderNum))
    filtred.sort(function(a:DataRecord,b: DataRecord){
        const aDate = new Date(a.date.date)
        const bDate = new Date(b.date.date)
        return +aDate - +bDate
    })
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm md:text-md">
                <thead>
                <tr className="bg-gray-100 border-b">
                {tableHead.map((name, index) => {
                    if (context.switcher.sourceOpt === "Chats" && name === "Contact") {
                        return null; // nebo jiná akce, například nezobrazovat nic
                    }
                    return (
                        <th key={index} className="text-left py-3 px-4 font-medium text-gray-700">
                            {name}
                        </th>
                    );
                })}
                </tr>
                </thead>
                <tbody>
                {filtred.map((obj, index) => {
                    return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{obj.date.date.substring(0, 19)}</td>
                    <td className="py-2 px-4">{obj.orderNum ? obj.orderNum : "undefined"}</td>
                    {context.switcher.sourceOpt !== "Chats" ? <td className="py-2 px-4">{obj.contact}</td> : ""}
                    <td className="py-2 px-4">{obj.topic}</td>
                    <td className="py-2 px-4">{obj.summary}</td>
                    <td className="py-2 px-4">{obj.countryCode}</td>
                    <td className="py-2 px-4">{obj.resolve ? "Yes" : "No"}</td>
                    </tr>
                    )
                    })}
                </tbody>
            </table>
            </div>
        );
        }
