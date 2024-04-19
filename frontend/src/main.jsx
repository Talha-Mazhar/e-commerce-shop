import React from 'react'
import ReactDOM from 'react-dom/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Provider } from 'react-redux'
import store from './store/store'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import AllRoutes from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider deferLoading={true}>
                <AllRoutes />
            </PayPalScriptProvider>
        </Provider>
    </React.StrictMode>
)
