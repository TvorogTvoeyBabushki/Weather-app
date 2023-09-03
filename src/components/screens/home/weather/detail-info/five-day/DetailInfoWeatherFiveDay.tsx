import { FunctionComponent } from 'react'
import clsx from 'clsx'

import SkeletonLoader from '@/components/ui/skeleton-loader/SkeletonLoader'

import { urlIcon } from '@/constants/urlIcon'

import styles from './DetailInfoWeatherFiveDay.module.scss'

import { useDetailInfoWeatherFiveDay } from './useDetailInfoWeatherFiveDay'

const DetailInfoWeatherFiveDay: FunctionComponent = () => {
	const {
		activeElList,
		ulData,
		weatherFiveDay,
		isWeatherFiveDay,
		windowWidth,
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
						<SkeletonLoader
							style={{ margin: '50px 9px 0 0' }}
							count={windowWidth < 1280 ? 1 : 5}
							inline
							height={windowWidth < 1280 ? 100 : 140}
							width={windowWidth < 1280 ? '100%' : 140}
						/>
					) : (
						<>
							<div>
								{windowWidth < 630 && (
									<div
										className={clsx(styles.scroll_border, styles.left)}
									></div>
								)}
								{weatherFiveDay?.map((item, index) => (
									<div key={index}>
										<p>{item.day.slice(0, 3)}</p>
										<img src={`${urlIcon}${item.icon}@2x.png`} alt='' />
										<p>{item.temp}°C</p>
									</div>
								))}
								{windowWidth < 630 && (
									<div
										className={clsx(styles.scroll_border, styles.right)}
									></div>
								)}
							</div>
						</>
					)}
				</>
			)}
		</div>
	)
}

export default DetailInfoWeatherFiveDay
