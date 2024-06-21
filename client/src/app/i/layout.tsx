"use client"

import DashboardLayout from './../../components/dashboard-layout/DashboardLayout';
import {GlobalStateContext} from "../../hooks/useGlobalContext";
import {useTimer} from "./timer/hooks/useTimer";
import {useProfile} from "../../hooks/useProfile";


export default function Layout({ children }) {

    const timerState = useTimer()
    const userProfile = useProfile()

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
                isRunning,
                userProfile
            }}>
            <DashboardLayout>{children}</DashboardLayout>
         </GlobalStateContext.Provider>
    )
}
