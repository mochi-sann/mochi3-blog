import dayjs from "dayjs"

const DateFormater = (value: string) => {
  return dayjs(value).format("YYYY-MM-DD")
}

export default DateFormater
