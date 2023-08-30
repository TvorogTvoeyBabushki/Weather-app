import { FunctionComponent } from 'react'

import Search from '@/components/ui/search/Search'

import styles from './SummaryTodayWeatherSearch.module.scss'

import { useSummaryTodayWeatherSearch } from './useSummaryTodayWeatherSearch'

const SummaryTodayWeatherSearch: FunctionComponent = () => {
	const { cities, handleSearch, handleLinkClick, isShowListCities } =
		useSummaryTodayWeatherSearch()

	return (
		<div className={styles.weather__search}>
			<Search
				type='text'
				name='search places'
				placeholder='Search for places...'
				onInput={handleSearch}
			/>
			{cities.length > 0 && isShowListCities && (
				<ul>
					{cities
						.slice(0, 10)
						.sort((a, b) => a.city.length - b.city.length)
						.map((itemCities, index) => (
							<li key={index}>
								<a
									onClick={e =>
										handleLinkClick(e, itemCities.city, itemCities.iso2)
									}
									href='#'
								>{`${itemCities.city}, ${itemCities.country}`}</a>
							</li>
						))}
				</ul>
			)}
		</div>
	)
}

export default SummaryTodayWeatherSearch
