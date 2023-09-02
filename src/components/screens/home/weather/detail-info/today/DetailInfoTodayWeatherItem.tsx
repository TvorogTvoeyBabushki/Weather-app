import { FunctionComponent } from 'react'
import { FiSunrise, FiSunset } from 'react-icons/fi'

interface IDetailInfoTodayWeatherItemProps {
	title: string
	description?: string
	sunrise?: string
	sunset?: string
	unit?: string
}

const DetailInfoTodayWeatherItem: FunctionComponent<
	IDetailInfoTodayWeatherItemProps
> = ({ description, title, sunrise, sunset, unit }) => {
	return (
		<div>
			<h3>{title}</h3>
			{sunrise && sunset ? (
				<div>
					<div>
						<FiSunrise />
						<p>{sunrise}</p>
					</div>
					<div>
						<FiSunset />
						<p>{sunset}</p>
					</div>
				</div>
			) : (
				<p>
					{description}
					<span
						style={{
							verticalAlign: unit === '%' ? 'super' : 'baseline'
						}}
					>
						{unit}
					</span>
				</p>
			)}
		</div>
	)
}

export default DetailInfoTodayWeatherItem
