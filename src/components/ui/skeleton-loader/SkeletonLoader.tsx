import { FunctionComponent } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'

import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader: FunctionComponent<SkeletonProps> = ({ ...rest }) => {
	return <Skeleton {...rest} />
}

export default SkeletonLoader
