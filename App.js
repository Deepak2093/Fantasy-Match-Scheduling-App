import { View, Text } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'
import { Provider } from 'react-redux'
import MyStore from './src/store'

const App = () => {
  return (
    <Provider store={MyStore}>
    <AppNavigation/>
    </Provider>
  )
}

export default App