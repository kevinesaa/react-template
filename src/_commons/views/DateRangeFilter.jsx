import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as MaterialUI from "@mui/material";

const startHour = 'T00:00:00.000Z';
const endHour = 'T23:59:59.999Z';

export default function DateRangeFilter(props) {
    
    let startDate = `${dayjs(props.minDefault).toISOString().substring(0,10)}${startHour}`;
    let endDate = `${dayjs(props.maxDefault).toISOString().substring(0,10)}${endHour}`;
    
    const onRangeDateChange = (inStartDate, inEndDate) => {
        startDate = inStartDate;
        endDate = inEndDate;
        if(props.onRangeDateChange) {
            props.onRangeDateChange(startDate,endDate);
        }
    }

    const onStartDateChange = (event) => {
        let onlyDate = event.$d.toISOString();
        onlyDate = `${onlyDate.substring(0,10)}${startHour}`;
        if(props.onStartDateChange) {
            
            props.onStartDateChange(onlyDate);
        }

        onRangeDateChange(onlyDate,endDate);
    }

    const onEndDateChange = (event) => {
        let onlyDate = event.$d.toISOString();
        onlyDate = `${onlyDate.substring(0,10)}${endHour}`;
        if(props.onStartDateChange) {
           
            props.onEndDateChange(onlyDate);
        }

        onRangeDateChange(startDate,onlyDate);
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            
            <MaterialUI.Box>
                
                <DatePicker 
                    label={props.startDateLabel}
                    sx={{ m: 1, width: props.pickerWith }}
                    minDate={dayjs(props.minDate)}
                    defaultValue={dayjs(props.minDefault)}
                    maxDate={dayjs(props.maxDate)}
                    onChange={onStartDateChange}
                    slotProps={{ textField: { size: 'small' } }}
                />

                <DatePicker 
                    label={props.endDateLabel}
                    sx={{ m: 1, width: props.pickerWith }}
                    minDate={dayjs(props.minDate)}
                    defaultValue={dayjs(props.maxDefault)}
                    maxDate={dayjs(props.maxDate)}
                    onChange={onEndDateChange}
                    slotProps={{ textField: { size: 'small' } }}
                />

            </MaterialUI.Box>
            
           
        </LocalizationProvider>
  );
}