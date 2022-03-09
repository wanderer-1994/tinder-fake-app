import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../component/Navbar'
import { Provider } from 'react-redux'
import store from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="app-wrapper">
        <Component {...pageProps} />
        <Navbar />
      </div>
    </Provider>
  )
}

export default MyApp
