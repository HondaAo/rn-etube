import React, { useContext, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer} from '@react-navigation/native'
import Login from './screen/Login'
import Register from './screen/Register'
import CenterSpinner from './component/CenterSpinner'
import Center from './component/Center'
import { ActivityIndicator, AsyncLocalStorage, AsyncStorage } from 'react-native'
import { AuthContext } from './AuthProvider'
import Videos, { VideoStack, videoTabs } from './screen/Video'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import Search, { SearchStack } from './screen/Search'
import User, { UserStack } from './screen/User'
import VideoPlayer from './screen/VideoPlayer'
import {VideoHeader} from './screen/Video'
import Guide from './screen/Guide'
const Stack = createStackNavigator()

const Tabs = createBottomTabNavigator();

const Routes = () => {
    const [ loading, setLoading ] = useState(true)
    const { user, setUser } = useContext(AuthContext)
    useEffect(() => {
      AsyncStorage.getItem("user")
      .then(userString => {
        if (userString) {
          setUser(userString)
          setLoading(false)
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
    }, [])
    if(loading){
      return (
          <Center>
              <ActivityIndicator size="large" />
          </Center>
      )
    }
    return (
        <NavigationContainer>
           {
            !user ? (
            <>
            <Stack.Navigator initialRouteName="Guide" screenOptions={{ header: () => null }}>
                <Stack.Screen name="Guide" component={Guide} />
                <Stack.Screen name="register" component={Register} />
                <Stack.Screen name="login" component={Login} />
            </Stack.Navigator>
            </>
            ): (
              <Stack.Navigator initialRouteName="All Videos">
                <Stack.Screen name="All Videos" options={{ headerTitle: VideoHeader }} component={videoTabs} />
                <Stack.Screen name="videoPlayer" options={({ route }) => ({ headerTitle: route.params.title , headerLeft: () => null })} component={VideoPlayer} />
              </Stack.Navigator>
              // <Tabs.Navigator
              //   screenOptions={({ route }) => ({
              //     tabBarIcon: ({ focused, color, size }) => {
              //       let iconName;
          
              //       if (route.name === "Videos") {
              //         iconName = "play";
              //         return <EvilIcons name={"play"} size={size} color={color} />;
              //       } else if (route.name === "Search") {
              //         return <EvilIcons name={"search"} size={size} color={color} />;
              //       } else if(route.name === "User") {
              //           return <EvilIcons name={"user"} size={size} color={color} />
              //       }
              //       return <Ionicons name={iconName} size={size} color={color} />;
              //     }
              //   })}
              //   tabBarOptions={{options={({ route }) => ({ headerTitle: route.params.title , headerLeft: () => null })}
              //     activeTintColor: "black",
              //     inactiveTintColor: "gray",
                  
              //   }}
              // >
              //   <Tabs.Screen name="Videos" component={Videos} />
              //   <Tabs.Screen name="Search" component={SearchStack} />
              //   <Tabs.Screen name="User" component={UserStack} />
              // </Tabs.Navigator> 
            )
            }
        </NavigationContainer>
    )
}

export default Routes

