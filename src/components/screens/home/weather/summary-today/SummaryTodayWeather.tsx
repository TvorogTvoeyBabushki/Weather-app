import { FunctionComponent, useState, useEffect } from 'react'

import SummaryTodayWeatherInfo from './info/SummaryTodayWeatherInfo'
import SummaryTodayWeatherSearch from './search/SummaryTodayWeatherSearch'
import { useSummaryTodayWeatherInfo } from './useSummaryTodayWeatherInfo'
import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

const SummaryTodayWeather: FunctionComponent = () => {
	const summaryTodayWeatherInfo = useSummaryTodayWeatherInfo()

	const [windowWidth, setWindowWidth] = useState(
		document.documentElement.clientWidth
	)
	useEffect(() => {
		window.addEventListener('resize', () => {
			setWindowWidth(document.documentElement.clientWidth)
		})

		return () =>
			window.removeEventListener('resize', () => {
				setWindowWidth(document.documentElement.clientWidth)
			})
	}, [])

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
				<SkeletonLoader
					count={windowWidth < 1280 ? 3 : 6}
					height={80}
					style={{ marginBottom: '25px' }}
				/>
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
