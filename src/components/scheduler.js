"use client"

import Calendar from "@event-calendar/core"
import TimeGrid from "@event-calendar/time-grid"
import Interaction from "@event-calendar/interaction"

import React, {useEffect, useMemo, useRef, useState} from "react"

import "@event-calendar/core/index.css"
import {DatePickerInput, DateTimePicker} from "@mantine/dates";
import {Button, Drawer, Group, SegmentedControl, Textarea, TextInput} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {nanoid} from "nanoid";


const EVENT_COLORS = [
    // Light:
    // "#c9a0dc",
    // "#fbee95",
    // "#99ccff",
    // "#ffb3c6",
    // "#a0db8e",
    // Dark:
    "#e91e63",
    "#c2185b",
    "#9c2780",
    "#5727b0",
    "#272ab0",
    "#57acdc",
    "#60c689",
]


const Scheduler = ({date}) => {
    const ref = useRef()
    const [rendered, setRendered] = useState(false)
    const [editedEvent, setEditedEvent] = useState(null)
    const [isEditorOpen, editorControls] = useDisclosure(false)

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
                    select: ({start, end, allDay, ...rest}) => {
                        const event = {
                            id: nanoid(),
                            start,
                            end,
                            allDay,
                            title: "",
                            extendedProps: {description: "", isNew: true},
                            backgroundColor: EVENT_COLORS[0],
                        }
                        cal.addEvent(event)
                        // cal.updateEvent(event)
                        setEditedEvent(event)
                        editorControls.open()
                    },
                    selectBackgroundColor: EVENT_COLORS[0],
                    eventClick: ({event}) => {
                        setEditedEvent(event)
                        editorControls.open()
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

    const closeEditor = ({save = false}) => {
        editorControls.close()
        if (save) {
            const newEvent = {
                ...editedEvent,
                extendedProps: {...editedEvent.extendedProps, isNew: false}
            }
            setEditedEvent(newEvent)
            calendar.updateEvent(newEvent)
        } else if (editedEvent?.extendedProps?.isNew) {
            calendar.removeEventById(editedEvent.id)
        }
    }

    return (
        <>
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

            <div ref={ref}/>

            <Drawer
                opened={isEditorOpen}
                onClose={() => closeEditor({save: false})}
                title={editedEvent?.extendedProps?.isNew ? "New Event" : "Edit Event"}
                position={"right"}>
                <form onSubmit={(event) => {
                    closeEditor({save: true})
                    event.preventDefault()
                }}>
                    <Group position={"apart"}>
                        <DateTimePicker
                            label={"Start"}
                            value={editedEvent?.start}
                            onChange={(value) => {
                                if (value) {
                                    setEditedEvent({...editedEvent, start: value})
                                }
                            }}
                        />
                        <DateTimePicker
                            label={"End"}
                            value={editedEvent?.end}
                            onChange={(value) => {
                                if (value) {
                                    setEditedEvent({...editedEvent, end: value})
                                }
                            }}
                        />
                    </Group>
                    <TextInput
                        label={"Title"}
                        placeholder={"Title"}
                        data-autofocus
                        value={editedEvent?.title}
                        onChange={(event) => {
                            setEditedEvent({...editedEvent, title: event.currentTarget.value})
                        }}
                    />
                    <Textarea
                        label={"Description"}
                        placeholder={"Description"}
                        value={editedEvent?.extendedProps?.description}
                        onChange={(event) => {
                            setEditedEvent({
                                ...editedEvent,
                                extendedProps: {...editedEvent.extendedProps, description: event.currentTarget.value}
                            })
                        }}
                    />
                    <div className={"my-2"}>
                        <SegmentedControl
                            data={EVENT_COLORS.map((color) => ({
                                value: color, label: (
                                    <div className={"w-4 h-4 rounded-full"} style={{backgroundColor: color}}/>
                                )
                            }))}
                            value={editedEvent?.backgroundColor}
                            onChange={(value) => {
                                setEditedEvent({...editedEvent, backgroundColor: value})
                            }}
                        />
                    </div>
                    <div className={"my-5"}>
                        <Group position={"apart"}>
                            <Button onClick={() => {
                                closeEditor({save: true})
                            }}>Save</Button>
                            {!editedEvent?.extendedProps?.isNew && (
                                <Button color={"red"} onClick={() => {
                                    closeEditor({save: false})
                                    calendar.removeEventById(editedEvent.id)
                                }}>Delete</Button>
                            )}
                        </Group>
                    </div>
                </form>
            </Drawer>
        </>
    )
}

export default Scheduler