import { FunctionComponent } from 'react'

import Layout from '@/components/layout/Layout'

import styles from './Home.module.scss'

import Weather from './weather/Weather'

const Home: FunctionComponent = () => {
	return (
		<Layout>
			<main>
				<div className='container'>
					<section className={styles.home}>
						<Weather />
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default Home
