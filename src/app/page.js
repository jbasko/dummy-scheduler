"use client"
import React, {useState} from "react"
import {Container} from "@mui/material"
import Scheduler from "@/components/scheduler"

import {LocalizationProvider} from "@mui/x-date-pickers"
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment"

import "moment/locale/lv"

export default function Home() {
    const [locale, setLocale] = useState("lv-LV")

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
            <Container maxWidth={"lg"}>
                <div className={"my-8"}>
                    <h1 className={"text-primary-500 text-4xl font-semibold"}>Hello, world!</h1>
                    <Scheduler/>
                </div>
            </Container>
        </LocalizationProvider>
    )
}
