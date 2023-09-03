import { FunctionComponent, createContext, useState } from 'react'

import { IWeatherData } from '@/shared/types/weatherData.types'

interface ILocalCoords {
	latitude: number
	longitude: number
}
interface ISelectCityProps {
	country: string
	city: string
}

interface IWeatherFiveDay {
	day: string
	temp: number
	icon: string
}

export interface IWeatherContextProps {
	cityWeatherData: IWeatherData | null
	setCityWeatherData: (cityWeatherData: IWeatherData | null) => void
	isLocalGeo: boolean
	setIsLocalGeo: (isLocalGeo: boolean) => void
	localCoords: ILocalCoords | null
	setLocalCoords: (localCoords: ILocalCoords) => void
	selectCity: ISelectCityProps | null
	setSelectCity: (selectCity: ISelectCityProps | null) => void
	localWeatherData: IWeatherData | null
	setLocalWeatherData: (localWeatherData: IWeatherData | null) => void
	weatherFiveDay: IWeatherFiveDay[] | null
	setWeatherFiveDay: (weatherFiveDay: IWeatherFiveDay[] | null) => void
	isError404: boolean
	setIsError404: (isError404: boolean) => void
}

export const WeatherContext = createContext<IWeatherContextProps | null>(null)

const WeatherProvider: FunctionComponent<{ children: JSX.Element }> = ({
	children
}) => {
	const [cityWeatherData, setCityWeatherData] = useState<IWeatherData | null>(
		null
	)
	const [isLocalGeo, setIsLocalGeo] = useState(true)
	const [localCoords, setLocalCoords] = useState<ILocalCoords | null>(null)
	const [selectCity, setSelectCity] = useState<ISelectCityProps | null>(null)
	const [localWeatherData, setLocalWeatherData] = useState<IWeatherData | null>(
		null
	)
	const [weatherFiveDay, setWeatherFiveDay] = useState<
		IWeatherFiveDay[] | null
	>(null)
	const [isError404, setIsError404] = useState(false)

	return (
		<WeatherContext.Provider
			value={{
				cityWeatherData,
				setCityWeatherData,
				isLocalGeo,
				setIsLocalGeo,
				localCoords,
				setLocalCoords,
				selectCity,
				setSelectCity,
				localWeatherData,
				setLocalWeatherData,
				weatherFiveDay,
				setWeatherFiveDay,
				isError404,
				setIsError404
			}}
		>
			{children}
		</WeatherContext.Provider>
	)
}

export default WeatherProvider
