import { FunctionComponent } from 'react'

import SummaryTodayWeatherInfo from './info/SummaryTodayWeatherInfo'
import SummaryTodayWeatherSearch from './search/SummaryTodayWeatherSearch'
import { useSummaryTodayWeatherInfo } from './useSummaryTodayWeatherInfo'

const SummaryTodayWeather: FunctionComponent = () => {
	const summaryTodayWeatherInfo = useSummaryTodayWeatherInfo()

	return (
		<div>
			{(summaryTodayWeatherInfo.isDisabledGeo ||
				!summaryTodayWeatherInfo.isBrowserSupport) && (
				<div className={'notification'}>
					{summaryTodayWeatherInfo.isDisabledGeo
						? 'Geolocation отключена пользователем'
						: 'Geolocation не поддерживается вашим браузером'}
				</div>
			)}
			{!summaryTodayWeatherInfo.weatherData ? (
				<>Loading...</>
			) : (
				<>
					<SummaryTodayWeatherSearch />
					<SummaryTodayWeatherInfo {...summaryTodayWeatherInfo} />
				</>
			)}
		</div>
	)
}

export default SummaryTodayWeather
