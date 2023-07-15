import React from "react"
import Scheduler from "@/components/scheduler";
import PlainPage from "@/components/plain-page";


export default function SchedulerPage() {
    return (
        <PlainPage title={"Scheduler"}>
            <Scheduler/>
        </PlainPage>
    )
}