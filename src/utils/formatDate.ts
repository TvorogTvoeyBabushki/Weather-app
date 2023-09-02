import moment from 'moment'

export const formatDate = (date: Date, variant: string) =>
	moment(date).format(variant === 'day' ? 'dddd' : 'HH:mm')

export const formatDateTimezone = (timezone: number, variant: string) =>
	moment
		.utc(new Date(Date.now() + timezone * 1000).toISOString())
		.format(variant === 'day' ? 'dddd' : 'HH:mm')

export const formatDateUnix = (unix: number, timezone: number) =>
	moment.utc(new Date(+moment.unix(unix) + timezone * 1000)).format('HH:mm')
