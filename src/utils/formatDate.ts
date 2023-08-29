import moment from 'moment'

export const formatDateDay = (date: Date) => moment(date).format('dddd')

export const formatDateTime = (date: Date) => moment(date).format('HH:mm')
