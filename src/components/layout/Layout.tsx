import { FunctionComponent } from 'react'

const Layout: FunctionComponent<{ children: JSX.Element }> = ({ children }) => {
	return <section>{children}</section>
}

export default Layout
