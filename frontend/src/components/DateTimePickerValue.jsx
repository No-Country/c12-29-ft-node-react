import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/es';

export default function DateTimePickerValue({handlerSelectDate}) {

  const [value, setValue] = useState(dayjs('2023-07-28T15:30'));
  const handleSelectValue = (newValue) => {
    setValue(new Date(newValue['$d']).toISOString())
    handlerSelectDate(newValue)
  }
  console.log()
  return (
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']} adapterLocale="es" >
        <DateTimePicker
          label="Controlled picker"
          value={value}
          onChange={handleSelectValue}
          disablePast
        />
      </DemoContainer>
  );
}