import { FunctionComponent } from 'react'
import { CiSearch } from 'react-icons/ci'

import styles from './Search.module.scss'

import { ISearchProps } from './Search.interface'

const Search: FunctionComponent<ISearchProps> = ({
	type,
	name,
	placeholder,
	onInput,
	value, onFocus
}) => {
	return (
		<label className={styles.search}>
			<CiSearch />
			<input
				onInput={onInput}
				value={value}
				onFocus={onFocus}
				type={type}
				name={name}
				placeholder={placeholder}
			/>
		</label>
	)
}

export default Search
