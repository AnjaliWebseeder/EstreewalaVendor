import React from 'react'
import Navigation from './src/navigation'
import {VendorProvider} from './src/utils/context/vendorContext'

export default function App() {
  return (
   <VendorProvider>
    <Navigation/>
    </VendorProvider>
  )
}