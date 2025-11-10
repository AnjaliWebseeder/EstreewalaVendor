import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
import { VendorProvider } from './src/utils/context/vendorContext'
import { ToastProvider } from './src/utils/context/toastContext'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux/store"

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <VendorProvider>
            <Navigation />
          </VendorProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>

  )
}