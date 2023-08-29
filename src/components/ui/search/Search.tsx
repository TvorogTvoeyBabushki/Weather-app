import axios from 'axios'
import {
	FunctionComponent,
	InputHTMLAttributes,
	useEffect,
	useState
} from 'react'
import { CiSearch } from 'react-icons/ci'

import styles from './Search.module.scss'

const Search: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({
	type,
	name,
	placeholder
}) => {
	const [cities, setCities] = useState([])
	const fetchGetCities = async () => {
		const { data } = await axios.get(
			'https://countriesnow.space/api/v0.1/countries',
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		setCities(data)
	}
	useEffect(() => {
		fetchGetCities()
	}, [])

	console.log(cities)

	return (
		<label className={styles.search}>
			<CiSearch />
			<input
				onInput={e => {
					const targetEl = e.target as HTMLInputElement
				}}
				type={type}
				name={name}
				placeholder={placeholder}
			/>
		</label>
	)
}

export default Search
