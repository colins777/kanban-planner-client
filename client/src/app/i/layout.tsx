"use client"

import DashboardLayout from './../../components/dashboard-layout/DashboardLayout';
import {GlobalStateContext} from "../../hooks/useGlobalContext";
import {useTimer} from "./timer/hooks/useTimer";


export default function Layout({ children }) {

    const timerState = useTimer()

    const {
        secondsLeft,
        activeRound,
        setActiveRound,
        setIsRunning,
        setSecondsLeft,
        isRunning
    } = timerState

    return (
        // Provide the global state to the children using the context provider
        <GlobalStateContext.Provider
            value={{
                secondsLeft,
                activeRound,
                setActiveRound,
                setIsRunning,
                setSecondsLeft,
                isRunning
            }}>
            <DashboardLayout>{children}</DashboardLayout>
         </GlobalStateContext.Provider>
    )
}
