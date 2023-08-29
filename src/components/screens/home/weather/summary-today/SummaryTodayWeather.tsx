import { FunctionComponent } from 'react'

import Search from '@/components/ui/search/Search'

import SummaryTodayWeatherInfo from './info/SummaryTodayWeatherInfo'

const SummaryTodayWeather: FunctionComponent = () => {
	return (
		<div>
			<Search
				type='text'
				name='search places'
				placeholder='Search for places...'
			/>
			<SummaryTodayWeatherInfo />
		</div>
	)
}

export default SummaryTodayWeather
