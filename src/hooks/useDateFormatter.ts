export const useDateFormatter = () => {
  const formatYear = (year: string) => {
    const regex = /\b\d{4}\b/
    const result = year.match(regex)
    return result
  }

  const formatMonth = (month: string) => {
    const allMonth = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const regex = /\b\d{2}\b/
    const monthResult = month.match(regex)?.toString()

    if (monthResult) {
      const monthIndex = Number(monthResult) - 1
      const monthName = allMonth[monthIndex]
      return monthName
    }
    return 'Unknown Month'
  }

  const formatDay = (day: string) => {
    const result = day.match(/-(\d{2})T/)
    return result ? result[1] : 'Unknow'
  }

  return { formatDay, formatMonth, formatYear }
}
