"use client"

import Calendar from "@event-calendar/core"
import TimeGrid from "@event-calendar/time-grid"
import Interaction from "@event-calendar/interaction"

import React, {useEffect, useMemo, useRef, useState} from "react"

import "@event-calendar/core/index.css"
import {DatePickerInput} from "@mantine/dates";


const EventEditor = ({open, onClose, event}) => {
    return (
        <div>
            Event Editor
        </div>
    )
    // return (
    //     <Dialog
    //         open={open}
    //         onClose={onClose}
    //     >
    //         <DialogTitle>Edit Event</DialogTitle>
    //         <DialogContent>
    //             <DialogContentText>You can edit the event details here.</DialogContentText>
    //             <TextField label={"Start time"} value={event?.start}/>
    //             <TextField
    //                 multiline={true}
    //                 rows={4}
    //             />
    //         </DialogContent>
    //     </Dialog>
    // )
}

const Scheduler = ({date}) => {
    const ref = useRef()
    const [rendered, setRendered] = useState(false)
    const [eventEditorOpen, setEventEditorOpen] = useState(false)
    const [editedEvent, setEditedEvent] = useState(null)

    const [calendarDate, setCalendarDate] = useState(date)

    const calendar = useMemo(() => {
        if (!ref.current) return

        const cal = new Calendar({
            target: ref.current,
            props: {
                plugins: [TimeGrid, Interaction],
                options: {
                    date: date,
                    editable: true,
                    selectable: true,
                    view: "timeGridWeek",
                    firstDay: 1,
                    locale: "lv-LV",
                    allDaySlot: false,
                    // scrollTime: "08:00:00",
                    slotMinTime: "06:00:00",
                    slotMaxTime: "24:00:00",
                    // allDayContent: "...",
                    headerToolbar: {start: "", center: "", end: ""}, // no header toolbar
                    events: [],
                    // dateClick: (info) => {
                    // },
                    select: ({start, end, allDay}) => {
                        const event = {start, end, allDay}
                        cal.addEvent(event)
                        setEditedEvent(event)
                        setEventEditorOpen(true)
                    },
                    eventClick: ({event}) => {
                        setEventEditorOpen(!eventEditorOpen)
                    },
                }
            }
        });

        return cal

    }, [rendered, ref])

    useEffect(() => {
        setRendered(true)
    }, [])

    useEffect(() => {
        if (calendar && calendar.getOption("date") !== calendarDate) {
            setCalendarDate(calendar.getOption("date"))
        }
    }, [calendar])

    return (
        <div>
            <div className={"w-44"}>
                <DatePickerInput
                    value={calendarDate}
                    onChange={(value) => {
                        if (value) {
                            setCalendarDate(value)
                            calendar.setOption("date", value)
                        }
                    }}
                />
            </div>

            {/*<DatePicker onChange={(value) => {*/}
            {/*    if (value.isValid()) {*/}
            {/*        calendar.setOption("date", value.toDate())*/}
            {/*    }*/}
            {/*}} />*/}
            <div ref={ref}/>
            <EventEditor
                event={editedEvent}
                open={eventEditorOpen}
                onClose={() => setEventEditorOpen(false)}
            />
        </div>
    )
}

export default Scheduler