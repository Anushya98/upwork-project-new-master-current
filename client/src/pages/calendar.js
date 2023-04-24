import { useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = async (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Event Name");
    const eventCategoryPrompt = prompt("Event Category");
    const eventDatePrompt = prompt("Event Date");
    const eventdescriptionPrompt = prompt("Description");
    const eventstatusPrompt = prompt("Status");
    const eventcreatedByPrompt = prompt("Created By");
    if (
      (eventNamePrompt,
      eventCategoryPrompt,
      eventDatePrompt,
      eventdescriptionPrompt,
      eventstatusPrompt,
      eventcreatedByPrompt)
    ) {
      console.log("enters if ");
      // setEvents([
      //   {
      //     eventNamePrompt,
      //     eventCategoryPrompt,
      //     eventDatePrompt,
      //     eventdescriptionPrompt,
      //     eventstatusPrompt,
      //     eventcreatedByPrompt,
      //     date: {
      //       start,
      //       end,
      //       eventName: eventNamePrompt,
      //       //   //id: uuid(),
      //     },
      //   }
      // ]);
      const newEvent = {
        eventName: eventNamePrompt,
        eventCategory: eventCategoryPrompt,
        eventDate: eventDatePrompt,
        eventdescription: eventdescriptionPrompt,
        eventstatus: eventstatusPrompt,
        eventcreatedBy: eventcreatedByPrompt,
        date: {
          start,
          end,
          eventName: eventNamePrompt,
          //   //id: uuid(),
        },
      }
      axios
        .post("http://localhost:5000/events", JSON.stringify(newEvent), {
          ...config,
          withCredentials: true,
        })
        .then(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
      setEvents((prevState) => {
        const tempEvents = [...prevState, newEvent]
        return tempEvents;
      })
    }
  };
  
  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.eventName}</p>
      </div>
    );
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        editable
        selectable
        select={handleSelect}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        eventContent={(info) => <EventItem info={info} />}
        plugins={[daygridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        events={events.map(event => {
          return {
            title: event.eventNamePrompt,
            date: formatDate(event.date.start),
          }
        })}
      />
    </div>
  );
};

export default Calendar;
