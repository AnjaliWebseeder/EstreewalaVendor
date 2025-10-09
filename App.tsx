import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './src/navigation'
import {VendorProvider} from './src/utils/context/vendorContext'
import {ToastProvider} from './src/utils/context/toastContext'
import store from "./src/redux/store"

export default function App() {
  return (
 <Provider store={store} >
     <ToastProvider>
      <VendorProvider>
    <Navigation/>
    </VendorProvider>
    </ToastProvider>
 </Provider>
   
  )
}