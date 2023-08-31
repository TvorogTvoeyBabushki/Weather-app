import { FunctionComponent, createContext, useState } from 'react'

import { IWeatherData } from '@/shared/types/weatherData.types'

interface ILocalCoords {
	latitude: number
  longitude: number
}

export interface IWeatherContextProps {
	cityWeatherData: IWeatherData | null
	setCityWeatherData: (cityWeatherData: IWeatherData) => void
	isLocalGeo: boolean
	setIsLocalGeo: (isLocalGeo: boolean) => void
	localCoords: ILocalCoords
	setLocalCoords: (localCoords: ILocalCoords) => void
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

	return (
		<WeatherContext.Provider value={{ 
			cityWeatherData, 
			setCityWeatherData, 
			isLocalGeo, 
			setIsLocalGeo,
			localCoords,
			setLocalCoords
			}}>
			{children}
		</WeatherContext.Provider>
	)
}

export default WeatherProvider
