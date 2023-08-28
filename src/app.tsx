import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './components/screens/home/Home'
import '@/assets/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Home />
	</React.StrictMode>
)
