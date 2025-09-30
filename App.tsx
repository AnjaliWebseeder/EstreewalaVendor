import React from 'react'
import Navigation from './src/navigation'
import {VendorProvider} from './src/utils/context/vendorContext'
import {ToastProvider} from './src/utils/context/toastContext'

export default function App() {
  return (
    <ToastProvider>
      <VendorProvider>
    <Navigation/>
    </VendorProvider>
    </ToastProvider>
   
  )
}