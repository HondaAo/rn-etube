import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import gql from 'graphql-tag';
import CenterSpinner from '../component/CenterSpinner';
import { useQuery } from 'react-apollo';
import Card from '../component/Card'
import VideoPlayer from './VideoPlayer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useNavigation ,useTheme} from '@react-navigation/native';
import SearchCard from '../component/SearchCard';
import Series from '../component/Series';
import Today from '../component/Today';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchStack } from './Search';
import { UserStack } from './User';
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";

export const FETCH_VIDEOS = gql`
 query {
   listingVideo {
     id
     title
     url
     view
     level
     script
     created
   }
 }
`
const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator();
const Videos = ({}) => {
  const [ refresh, setRefresh ] = useState(false)
  const scrollX = new Animated.Value(0)
  const diffClamp = Animated.diffClamp(scrollX,0,45)
  const translateY = diffClamp.interpolate({
    inputRange:[0,45],
    outputRange:[0,-45]
  })
  const { data, error, loading } = useQuery(FETCH_VIDEOS)
  if (error) {
    console.error(error);
    return <Text>Error</Text>;
  }
  if (loading) {
    return <CenterSpinner />;
  }
  if(data){
  }
  const date = new Date()
  const today = date.getFullYear() + "-" + 0 + parseInt(date.getMonth() + 1) + "-"+ parseInt(date.getDate())
  const todayVideo = data.listingVideo.filter((video) => {
    return video.created.slice(0, 10) === today
  })
  const recommendedVideo = data.listingVideo.filter((video) => {
    if(date.getDate() < 7){
      return video.created.slice(5, 7) === date.getMonth() + 1 || video.created.slice(8, 10) > 26
    }
    return   video.created.slice(8, 10) <= date.getDate() && video.created.slice(8, 10) >= parseInt(date.getDate() - 7)
  })
  return (
    <View>
      <Animated.View
      style={{
        transform:[
          {translateY:translateY }
        ],
        elevation:4,
        zIndex:100,
      }}
      >
      </Animated.View>
    <ScrollView 
    refreshControl={
      <RefreshControl
       refreshing={refresh}
     />
    }
    >
    <View style={{ width: "100%", marginLeft: 'auto', marginRight: 'auto'}}>
    <View style={{ backgroundColor: 'white', paddingTop: 20, paddingLeft: 15, marginBottom: 10, paddingBottom: 10}}>
    <View style={{ paddingLeft: 8}}>
      <Text style={{ fontWeight: '700', fontSize: 23, marginBottom: 12}}>Today's video</Text>
      <Text style={{ color: '#000', marginTop: -5, opacity: 0.3}}>These videos were uploaded today</Text>
    </View>
    <View style={{ flex: 1 }}>
    <FlatList
       data={todayVideo}
       renderItem={({item})=>{
        return( 
        <Today
        id={item.id}
        title={item.title}
        url={item.url}
        view={item.view}
        />
        )
      }}
      keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ width: Dimensions.get('window').width + 5, flex: 1 }}
      />
    </View>
    </View>
    </View>
    <View style={{ backgroundColor: 'white' }}>
    <View style={{  paddingTop: 20, width: "95%", marginLeft: 'auto', marginRight: 'auto' }}>
    <View style={{ marginBottom: 22, paddingLeft: 15 }}>
      <Text style={{ fontWeight: '700', fontSize: 23, marginBottom: 5}}>Recommendation</Text>
      <Text style={{ color: '#000',opacity: 0.3}}>These videos were uploaded in this week</Text>
    </View>
    <FlatList
      data={recommendedVideo}
      renderItem={({item})=>{
        return <Card
        id={item.id}
        title={item.title}
        url={item.url}
        view={item.view}
        level={item.level}
        />
      }}
      keyExtractor={item => item.id}
      // onScroll={(e)=>{
      //     scrollY.setValue(e.nativeEvent.contentOffset.y) 
      // }}
      />
       </View>
      </View>
     </ScrollView>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 0.8,
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7'
  },
  scrollViewContainer: {
    justifyContent: 'flex-start'
  },
  banner: {
    flexDirection: 'column',
    backgroundColor: '#39235A',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  pagination: {
    flexDirection: 'row',
    backgroundColor: '#39235A',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white'
  }
});

// export const VideoStack = () => {
//     const navigation = useNavigation()
//     return (
//     <Stack.Navigator initialRouteName="video">
//         <Stack.Screen name="All Videos" options={{ headerTitle: VideoHeader }} component={Videos} />
//         <Stack.Screen name="videoPlayer" options={({ route }) => ({ headerTitle: route.params.title , headerLeft: () => null })} component={VideoPlayer} />
//     </Stack.Navigator>
//     )
// }

export const videoTabs = () => {
  return (
  
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === "Videos") {
              iconName = "play";
              return <EvilIcons name={"play"} size={size} color={color} />;
            } else if (route.name === "Search") {
              return <EvilIcons name={"search"} size={size} color={color} />;
            } else if(route.name === "User") {
                return <EvilIcons name={"user"} size={size} color={color} />
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: "black",
          inactiveTintColor: "gray",
          
        }}
      >
        <Tabs.Screen name="Videos" component={Videos} />
        <Tabs.Screen name="Search" component={SearchStack} />
        <Tabs.Screen name="User" component={UserStack} />
      </Tabs.Navigator> 
    
  )
}
export const VideoHeader = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', minWidth: "100%", paddingLeft: 18, paddingRight: 18 }}>
        <View style={{ flexDirection: 'row' }}>
        <Icon
          name="etsy"
          size={24}
          color="black"
        /> 
        <Text style={{ marginTop: 9, marginRight: 180}}>tube</Text>  
        </View>
        <Icon
          name="etsy"
          size={24}
          color="white"
        /> 
        <Icon
          name="ellipsis-h"
          size={24}
          color="white"
        /> 
      </View>
    );
};
export default Videos;