'use client'

import {useFormatDate} from "../../../../hooks/useFormatDate";
import {useFormatSecondsToHours} from "../../../../hooks/useFormatSecondsToHours";


// interface ISwitcherView {
//     type: TypeView
//     setType: (value: TypeView) => void
// }

export function TaskSpentTimeBlock({time}) {

   // console.log('startTime', startTime)
    //console.log('startTime', time)

    return (
        <>
            <div className='flex justify-between w-full'>
                <div>{useFormatDate(time.startTime)} - {useFormatDate(time.endTime)}</div>
                {/*<div>{time.totalTime} s</div>*/}

                <div>{time.totalTime ? useFormatSecondsToHours(time.totalTime) : 0}</div>
            </div>

            {/*<div className='grid grid-cols-2  w-full'>*/}
            {/*    <div>0:20 - 0:25</div>*/}
            {/*    <div>5 min</div>*/}
            {/*</div>*/}

            {/*<div className='grid grid-cols-2  w-full'>*/}
            {/*    <div>16:00 - 17:00</div>*/}
            {/*    <div>1 hour</div>*/}
            {/*</div>*/}
        </>
    )
}
