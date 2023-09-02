import { FunctionComponent } from 'react'
import clsx from 'clsx'

import { urlIcon } from '@/constants/urlIcon'

import styles from './DetailInfoWeatherFiveDay.module.scss'

import { useDetailInfoWeatherFiveDay } from './useDetailInfoWeatherFiveDay'

const DetailInfoWeatherFiveDay: FunctionComponent = () => {
	const {
		activeElList,
		ulData,
		weatherFiveDay,
		isWeatherFiveDay,
		handleWeatherFiveDayClick
	} = useDetailInfoWeatherFiveDay()

	return (
		<div className={styles.weather__five_day}>
			<nav>
				<ul>
					{ulData.map((element, index) => (
						<li key={index}>
							<button
								className={clsx('', {
									[styles.active]:
										activeElList === element ||
										(!isWeatherFiveDay && element === 'today')
								})}
								disabled={activeElList === element ? true : false}
								onClick={() => handleWeatherFiveDayClick(element)}
							>
								{element}
							</button>
						</li>
					))}
				</ul>
			</nav>

			{isWeatherFiveDay && (
				<>
					{!weatherFiveDay ? (
						<div>Loading...</div>
					) : (
						<div>
							{weatherFiveDay?.map((item, index) => (
								<div key={index}>
									<p>{item.day}</p>
									<img src={`${urlIcon}${item.icon}@2x.png`} alt='' />
									<p>{item.temp}°C</p>
								</div>
							))}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default DetailInfoWeatherFiveDay
