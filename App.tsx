import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
import { VendorProvider } from './src/utils/context/vendorContext'
import { ToastProvider } from './src/utils/context/toastContext'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux/store"
import { SocketProvider } from "./src/utils/context/socketContext"
import { requestUserPermission, getFcmToken, notificationListener } from "./src/utils/notification/notificationService"
import UpdateModal from "./src/otherComponent/updateModal"

export default function App() {

  useEffect(() => {
    requestUserPermission()
    getFcmToken()
    notificationListener()
  }, [])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <VendorProvider>
            <SocketProvider>
              <UpdateModal />
              <Navigation />
            </SocketProvider>
          </VendorProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>

  )
}