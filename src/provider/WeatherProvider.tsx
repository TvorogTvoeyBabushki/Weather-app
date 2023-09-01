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

export interface IWeatherContextProps {
	cityWeatherData: IWeatherData | null
	setCityWeatherData: (cityWeatherData: IWeatherData) => void
	isLocalGeo: boolean
	setIsLocalGeo: (isLocalGeo: boolean) => void
	localCoords: ILocalCoords
	setLocalCoords: (localCoords: ILocalCoords) => void
	selectCity: ISelectCityProps | null
	setSelectCity: (selectCity: ISelectCityProps | null) => void
}

export const WeatherContext = createContext<IWeatherContextProps | null>(null)

const WeatherProvider: FunctionComponent<{ children: JSX.Element }> = ({
	children
}) => {
	const [cityWeatherData, setCityWeatherData] = useState<IWeatherData | null>(
		null
	)
	const [isLocalGeo, setIsLocalGeo] = useState(true)
	const [localCoords, setLocalCoords] = useState({
		latitude: 0,
		longitude: 0
	})
	const [selectCity, setSelectCity] = useState<ISelectCityProps | null>(null)

	return (
		<WeatherContext.Provider value={{ 
			cityWeatherData, 
			setCityWeatherData, 
			isLocalGeo, 
			setIsLocalGeo,
			localCoords,
			setLocalCoords,
			selectCity,
			setSelectCity
			}}>
			{children}
		</WeatherContext.Provider>
	)
}

export default WeatherProvider
