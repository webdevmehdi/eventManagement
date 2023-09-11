import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import { TextField, Stack } from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";
import { useState } from "react";
const TimePicker = () => {
  const [selectedDate, setSelectedDate] = useState();
  const setValue = () => {
    props.setValuetime(true)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={4} sx={{ width: "250px" }}>
        <DateTimePicker
          label="Date Time"
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          /*  disableCloseOnSelect={true} */  
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default TimePicker;
