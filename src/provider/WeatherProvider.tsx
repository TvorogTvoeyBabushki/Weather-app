import { FunctionComponent, createContext, useState } from 'react'

import { IWeatherData } from '@/shared/types/weatherData.types'

export interface IWeatherContextProps {
	cityWeatherData: IWeatherData | null
	setCityWeatherData: (cityWeatherData: IWeatherData) => void
}

export const WeatherContext = createContext<IWeatherContextProps | null>(null)

const WeatherProvider: FunctionComponent<{ children: JSX.Element }> = ({
	children
}) => {
	const [cityWeatherData, setCityWeatherData] = useState<IWeatherData | null>(
		null
	)

	return (
		<WeatherContext.Provider value={{ cityWeatherData, setCityWeatherData }}>
			{children}
		</WeatherContext.Provider>
	)
}

export default WeatherProvider
