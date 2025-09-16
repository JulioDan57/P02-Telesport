// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
import  'src/app/core/models/Participation';

export interface Olympic {
   id: number;
   country: string;
   participations: Participation[];
}

export interface DataPerCountry
{
    country:string;
    numberOfEntries:number;
    totalNumberOfMedals:number;
    totalNumberOfAthletes:number;
}

export interface JsonReadingStatus
{
  failed:boolean;
  message:string; 
}


