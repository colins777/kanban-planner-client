import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const { parse, format, parseISO } = require('date-fns');


//'2024-05-23 11:00:52.04';
export function useFormatDate (originalDateTime:string):string {

    const parsedDate = parseISO(originalDateTime);

   // console.log('originalDateTime', originalDateTime)
    //console.log('parsedDate', parsedDate)

    // Define the desired output format
    const desiredFormat = 'dd.MM.yyyy HH.mm';
    const formattedDate = format(parsedDate, desiredFormat);

    //console.log(formattedDate); // Output: '23.05.2024 11.00'

    return formattedDate
}
