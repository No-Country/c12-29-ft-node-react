
 /* let date = '2023-07-25T04:14:24.276Z' */
export function dateFormater(date){
  
  const newDate = new Date(date)
  const dayName = date => {
    return [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ][new Date(date).getDay()];
  }
  const day = dayName(date)

  const monthName = date => {
    return [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciemnbre'
    ][new Date(date).getMonth()]
  }
  const month = monthName(date)
  const [year, hour, minutes, seconds] = [newDate.getFullYear(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()]
  const numberDayOfMonth = date.slice(8,10)
  
  return {day, numberDayOfMonth, month, year,hour, minutes, seconds}
}