import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

const { parse, format, parseISO } = require('date-fns');


//'2024-05-23 11:00:52.04';
export function useFormatSecondsToHours (seconds:string):string {

    if(seconds < 60 && seconds > 0) {
        return ' ' + seconds + ' s'
    }

    //minutes
    if (seconds > 60 && seconds < 3600) {
        const minutes = ' ' + parseInt(seconds / 60) + ' min'

        return minutes;
    }

    //hour + min
    if (seconds  >= 3600 ) {
        const hours = ' ' + parseInt(seconds / 3600)  + ' h ' + parseInt((seconds % 3600) / 60) + ' min'

        return hours;
    }

    return seconds
}
