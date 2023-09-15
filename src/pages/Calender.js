import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, TextField, Typography } from "@mui/material";
import ModalPopup from "./Modal";
import useModal from "../Hooks/useModal";

const localizer = momentLocalizer(moment);

function HolidayCalendar() {
  const { toggle, isShowing } = useModal();
  const [events, setEvents] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState({
    title: "",
    description: "",
  });
  const [newHoliday, setNewHoliday] = useState({
    title: "",
    description: "",
    start: null,
    end: null,
  });

  const handleAddHoliday = () => {
    if (
      !newHoliday.title ||
      !newHoliday.description ||
      !newHoliday.start ||
      !newHoliday.end
    ) {
      alert("Holiday Title Or Date Missing");
      return;
    }
 
    setEvents([...events, newHoliday]);
    localStorage.setItem("events", JSON.stringify([...events, newHoliday]));
    setNewHoliday({
      title: "",
      description: "",
      start: null,
      end: null,
    });
  };

  const getHolidayList = () => {
    fetch(
      "https://calendarific.com/api/v2/holidays?&api_key=GffyiNwNKS6K0mWkGxODhlxkJhtJykJC&country=IN&year=2023'"
    )
      .then((res) => res.json())
      .then((json) => {
        let holidays = [];
        let res = json.response.holidays.filter(
          (item) => item.primary_type === "Gazetted Holiday"
        );
        res.forEach((item) => {
          let data = {
            title: item.name,
            description: item.description,
            start: item.date.iso,
            end: item.date.iso,
          };
          holidays.push(data);
        });
        setEvents(holidays);
        localStorage.setItem("events", JSON.stringify(holidays));
      });
  };

  useEffect(() => {
    let holidays = JSON.parse(localStorage.getItem("events"));
    if (!holidays || !holidays.length) {
      getHolidayList();
      return;
    }
    setEvents(holidays);
  }, []);

  const handleEventClick = (e) => {
    setSelectedHoliday({
      title: e.title,
      description: e.description,
    });
    toggle();
  };

  return (
    <div>
      <Typography variant="h3" component="h3">
        Holiday Calendar
      </Typography>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <TextField
          type="text"
          placeholder="Holiday Title"
          value={newHoliday.title}
          style={{ margin: "10px" }}
          onChange={(e) =>
            setNewHoliday({ ...newHoliday, title: e.target.value })
          }
        />
        <TextField
          multiline
          placeholder="Holiday Description"
          value={newHoliday.description}
          style={{ margin: "10px" }}
          onChange={(e) =>
            setNewHoliday({ ...newHoliday, description: e.target.value })
          }
        />
        <TextField
          type="date"
          id="date-input"
          value={
            newHoliday.start
              ? new Date(newHoliday.start).toISOString().split("T")[0]
              : ""
          }
          style={{ margin: "10px" }}
          onChange={(e) =>
            setNewHoliday({
              ...newHoliday,
              start: new Date(e.target.value),
              end: new Date(e.target.value),
            })
          }
        />
        <Button
          style={{ margin: "10px" }}
          sx={{ height: '50px' }}
          variant="contained"
          size="medium"
          type="button"
          onClick={handleAddHoliday}
        >
          Add Holiday
        </Button>
      </div>
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          onSelectEvent={handleEventClick}
        />

        <ModalPopup
          isShowing={isShowing}
          hide={toggle}
          selectedHoliday={selectedHoliday}
        />
      </div>
    </div>
  );
}

export default HolidayCalendar;
