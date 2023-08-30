import { FunctionComponent } from 'react'
import { CiSearch } from 'react-icons/ci'

import styles from './Search.module.scss'

import { ISearchProps } from './Search.interface'

const Search: FunctionComponent<ISearchProps> = ({
	type,
	name,
	placeholder,
	onInput
}) => {
	return (
		<label className={styles.search}>
			<CiSearch />
			<input
				onInput={onInput}
				type={type}
				name={name}
				placeholder={placeholder}
			/>
		</label>
	)
}

export default Search
