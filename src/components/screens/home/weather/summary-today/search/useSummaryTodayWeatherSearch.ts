import { useEffect, useMemo, useState } from 'react'

import CitiesService from '@/services/cities/cities.service'
import WeatherService from '@/services/weather/weather.service'

import { useDebounce } from '@/hooks/useDebounce'
import { useWeather } from '@/hooks/useWeather'
import { ICities } from '@/shared/types/citiesData.types'

export const useSummaryTodayWeatherSearch = () => {
	const [citiesData, setCitiesData] = useState<ICities | null>(null)
	const [cities, setCities] = useState<
		{ city: string; iso2: string; country: string }[]
	>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [isShowListCities, setIsShowListCities] = useState(true)

	const debouncedSearch = useDebounce(searchTerm, 500)
	const { setCityWeatherData } = useWeather()

	const fetchCityWeather = async (city: string, country: string) => {
		const { data } = await WeatherService.getCityWeather(city, country)

		setCityWeatherData(data)
	}

	const handleLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		city: string,
		country: string
	) => {
		e.preventDefault()

		fetchCityWeather(city, country)
		setIsShowListCities(false)
	}

	const fetchGetCities = async () => {
		const { data } = await CitiesService.getAllCities()
		setCitiesData(data)
	}
	//--------------------- решить проблему с закрытием списка
	useEffect(() => {
		document.addEventListener('click', () => setIsShowListCities(false))

		return () => {
			document.removeEventListener('click', () => setIsShowListCities(false))
		}
	}, [])
	//-------------------
	useEffect(() => {
		fetchGetCities()
	}, [])

	useEffect(() => {
		const searchCities: { city: string; iso2: string; country: string }[] = []

		citiesData?.data.forEach(itemCitiesData => {
			itemCitiesData.cities.forEach(city => {
				if (city.toLowerCase().includes(debouncedSearch.toLowerCase())) {
					searchCities.push({
						city: city,
						iso2: itemCitiesData.iso2,
						country: itemCitiesData.country
					})
				}
			})
		})
		setCities(searchCities)

		debouncedSearch && setIsShowListCities(true)
	}, [debouncedSearch])

	const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		const targetEl = e.target as HTMLInputElement

		setSearchTerm(targetEl.value.trim())
		!targetEl.value.trim().length && setIsShowListCities(false)
	}

	return useMemo(
		() => ({
			cities,
			isShowListCities,
			handleLinkClick,
			handleSearch
		}),
		[cities, isShowListCities]
	)
}
