if (process.env.BROWSER) {
  require('../styles/Dashboard.scss')
  require('../styles/BigCalendar.scss')

  // require('../../node_modules/react-big-calendar/lib/css/react-big-calendar.css')
}

import React, { Component, PropTypes } from 'react'
// import Users from './Users'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from '../__events_test_data.js'

export default class Dashboard extends Component {



  constructor() {
    super()
    BigCalendar.momentLocalizer(moment)
  }

  render() {
    return  (
      <div className="Dashboard">
      <BigCalendar
        selectable
        events={events}
        defaultView='month'
        defaultDate={new Date(2015, 3, 1)}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}`
        )}
        />
      </div>
      )
  }
}
