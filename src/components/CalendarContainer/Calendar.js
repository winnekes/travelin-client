import React from 'react';
import * as ReactCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../assets/styles/calendar.css';

const localizer = ReactCalendar.momentLocalizer(moment);

function eventStyleGetter(event, start, end, isSelected) {
    var style = {
        backgroundColor: event.color,
        borderRadius: '20px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        paddingLeft: '10px',
        display: 'block',
    };
    return {
        style: style,
    };
}
export default function Calendar(props) {
    return (
        <div className="calendar">
            <ReactCalendar.Calendar
                localizer={localizer}
                date={new Date(props.startDate)}
                views={['month']}
                events={props.events}
                eventPropGetter={eventStyleGetter}
                onNavigate={props.onNavigate}
                onSelectEvent={props.onSelectEvent}
                onSelectSlot={props.onSelectSlot}
                popup
                selectable
            />
        </div>
    );
}
