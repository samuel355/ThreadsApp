import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

type Props = {}

const HomeScreen = (props: Props) => {
  const {user} = useSelector((state:any) => (state.user))
  console.log(user.name)
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Text> Welcome {user.name}</Text>
    </SafeAreaView>
  )
}

export default HomeScreen