import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DbContext } from '../App';

const DateRangePicker: React.FC = () => {
    const { fromDate } = useContext(DbContext)
    const { toDate } = useContext(DbContext)
    const { startDate, setStartDate } = fromDate
    const { endDate, setEndDate } = toDate

    return (
        <div className="flex gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Datum od:</label>
                <DatePicker 
                    selected={startDate} 
                    onChange={date => setStartDate(date)} 
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Datum do:</label>
                <DatePicker 
                    selected={endDate} 
                    onChange={date => setEndDate(date)} 
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
