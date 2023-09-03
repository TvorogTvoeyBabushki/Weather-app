import { useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'

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
	const [isShowListCities, setIsShowListCities] = useState(false)

	const debouncedSearch = useDebounce(searchTerm, 500)
	const {
		setCityWeatherData,
		setIsLocalGeo,
		setSelectCity,
		setLocalWeatherData,
		setWeatherFiveDay,
		setIsError404
	} = useWeather()

	const fetchCityWeather = async (city: string, country: string) => {
		try {
			const { data } = await WeatherService.getCityWeather(city, country)

			setCityWeatherData(data)
			data && setIsError404(false)
		} catch (error) {
			const err = error as AxiosError

			if (err.response!.status === 404) setIsError404(true)
			console.log(error)
		}
	}

	const handleLinkClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		city: string,
		country: string
	) => {
		e.preventDefault()

		fetchCityWeather(city, country)
		setSelectCity({ country, city })
		setLocalWeatherData(null)
		setWeatherFiveDay(null)
		setIsShowListCities(false)
		setSearchTerm('')
		setIsLocalGeo(false)
	}

	const fetchGetCities = async () => {
		try {
			const { data } = await CitiesService.getAllCities()
			setCitiesData(data)
		} catch (error) {
			console.log(error)
		}
	}

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

		setSearchTerm(targetEl.value.trimStart())
		!targetEl.value.trim().length && setIsShowListCities(false)
	}

	const handleCloseClick = () => setIsShowListCities(false)
	const handleSearchFocus = () => debouncedSearch && setIsShowListCities(true)
	const handleLocalGeo = () => {
		setIsLocalGeo(true)
		setSelectCity(null)
		setCityWeatherData(null)
		setWeatherFiveDay(null)
		setIsError404(false)
	}

	return useMemo(
		() => ({
			cities,
			isShowListCities,
			searchTerm,
			handle: {
				handleLinkClick,
				handleSearch,
				handleCloseClick,
				handleSearchFocus,
				handleLocalGeo
			}
		}),
		[cities, isShowListCities, searchTerm]
	)
}
