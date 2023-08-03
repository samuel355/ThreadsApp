import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {navigation: any}

const HomeScreen = ({navigation} : Props) => {
  const {user} = useSelector((state:any) => (state.user))

  console.log(user)
  console.log(user.name)

  async function remove(){
    await AsyncStorage.removeItem('user_details');
  }

  remove()

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Text> Welcome {user.name} </Text>
    </SafeAreaView>
  )
}

export default HomeScreen