import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './components/screens/home/Home'
import WeatherProvider from './provider/WeatherProvider'
import '@/assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WeatherProvider>
			<Home />
		</WeatherProvider>
	</React.StrictMode>
)
