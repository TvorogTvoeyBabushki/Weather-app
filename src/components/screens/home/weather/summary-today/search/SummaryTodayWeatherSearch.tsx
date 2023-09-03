import { FunctionComponent } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsGeoAltFill } from 'react-icons/bs'

import Search from '@/components/ui/search/Search'

import styles from './SummaryTodayWeatherSearch.module.scss'

import { useWeather } from '@/hooks/useWeather'
import { useSummaryTodayWeatherSearch } from './useSummaryTodayWeatherSearch'

const SummaryTodayWeatherSearch: FunctionComponent = () => {
	const { cities, handle, isShowListCities, searchTerm } =
		useSummaryTodayWeatherSearch()
	const { isLocalGeo } = useWeather()

	return (
		<div className={styles.weather__search}>
			<div>
				<Search
					type='text'
					name='search places'
					placeholder='Search for places...'
					onFocus={handle.handleSearchFocus}
					onInput={handle.handleSearch}
					value={searchTerm}
				/>
				<button
					onClick={handle.handleLocalGeo}
					disabled={isLocalGeo ? true : false}
				>
					<BsGeoAltFill />
				</button>
			</div>

			{cities.length > 0 && isShowListCities && (
				<>
					<button onClick={handle.handleCloseClick}>
						<IoMdClose size={25} />
					</button>
					<ul>
						{cities
							.slice(0, 7)
							.sort((a, b) => a.city.length - b.city.length)
							.map((itemCities, index) => (
								<li key={index}>
									<a
										onClick={e =>
											handle.handleLinkClick(
												e,
												itemCities.city,
												itemCities.iso2
											)
										}
										href='#'
									>{`${itemCities.city}, ${itemCities.country}`}</a>
								</li>
							))}
					</ul>
				</>
			)}
		</div>
	)
}

export default SummaryTodayWeatherSearch
