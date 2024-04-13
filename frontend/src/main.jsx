import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import AllRoutes from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AllRoutes />
        </Provider>
    </React.StrictMode>
)
