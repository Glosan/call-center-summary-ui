export const topicOptions = [
    'All',
    'Dotaz k produktu',
    'Faktura',
    'Kamenná prodejna',
    'Nekompletní balíček',
    'Obecný dotaz',
    'Obecný dotaz k objednávce',
    'Objednávka přes call-centrum',
    'Otázka k dodání',
    'Pomoc s eshopem',
    'Reklamace',
    'Reklamace-doručen špatný produkt',
    'Reklamace-nepoužitelný produkt',
    'Reklamace-poškozený balíček',
    'Změna v objednávce',
    'Zpoždění dodávky',
    'Zraněný zákazník',
    'Zrušení objednávky'
]

export const sourceOptions = [
    'Calls',
    'Emails',
    'Chats'
]


export const countryOptions = [
    {value: 'all', title: 'All'},
    {value: 'cs-CZ', title: 'CZ'},
    {value: 'ro-RO', title: 'RO'},
    {value: 'hu-HU', title: 'HU'},
]

export const tableHead = [
    'TimeStamp',
    'Order Number',
    'Contact',
    'Topic',
    'Summary',
    'Country',
    'Resolved'
]

import { DataRecord } from "./types"

function comparePhone(a: string, b: string) {return a.startsWith(b)}

function compareTopic(a: string, b: string) {return a.includes(b.toLowerCase()) || b === "All"}

function compareCountry(a: string, b:string){return a.includes(b) || b === "all"}

function compareDates(recordDate: string, startDate: Date, endDate: Date){
    const rDate = new Date(recordDate)
    rDate.setHours(0,0,0,0)
    startDate.setHours(0,0,0,0)
    endDate.setHours(0,0,0,0)
    return rDate <= endDate && rDate >= startDate 
}

function compareUnresolved(recordResolved: number, unresolved: boolean){
    return unresolved ? recordResolved === 0 : true

}

function compareOrderNum(a: string, b: string){
    if (a === null){return false}
    return a.startsWith(b)
}

export function dataFilter(record: DataRecord, contact: string, topic: string, country: string, startDate: Date, endDate: Date, unresolved: boolean, orderNum: string) {
    return  compareTopic(record.topic, topic) &&
            compareCountry(record.countryCode, country) &&
            compareDates(record.date.date, startDate, endDate) &&
            compareUnresolved(record.resolve, unresolved) &&
            compareOrderNum(record.orderNum, orderNum) && (record.contact ? comparePhone(record.contact, contact) : true)
}