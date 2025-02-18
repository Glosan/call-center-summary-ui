export interface DataRecord {
    activitySign: string;
    countryCode: string;
    summary: string;
    topic: string;
    resolve: number;
    date: TimeStamp;
    contact: string;
    orderNum: string;
  }

export interface TimeStamp {
  date: string,
  timezone_type: string,
  timezone: string
}

export interface SearchOptions{
  phone: OptionData,
  selectedTopic: OptionData
}
type OptionData = Record<string, string | React.Dispatch<React.SetStateAction<string>>> & { 
  name?: string;
  foo?: React.Dispatch<React.SetStateAction<string>>;
}