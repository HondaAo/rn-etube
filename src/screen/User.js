import React, { useContext, useEffect, useState } from 'react'
import { AsyncStorage, View, Text, RefreshControl, Share, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthProvider'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation ,useTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Center from '../component/Center';
import  Header, { UserHeader } from '../component/Header';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import CenterSpinner from '../component/CenterSpinner';
import SearchCard from '../component/SearchCard';
import AllVideo from './AllVideo';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import SvgUri from 'react-native-svg-uri';
import Voca from './Voca';

const Stack = createStackNavigator()


export const FETCH_VIDEOS = gql`
  query checkedVideo($show: Float!, $ids: String!){
  checkedVideo (show: $show, ids: $ids ){
     id
     title
     url
     view
     script
     created
     level
   }
 }
`

const User = () => {
    const { user,setUser, logout, setLike, like, setVoca, voca } = useContext(AuthContext);
    const [ show, setShow ] = useState(false)
    const navigation = useNavigation()
    const [ refresh, setRefresh ] = useState(false)
    const [ dialog, setDialog ] = useState(false)
    const image = require('../../assets/undraw.svg')
    useEffect(() => {
       AsyncStorage.getItem('user').then(json => setUser(JSON.parse(json))).catch((err) => console.log('error')) 
       AsyncStorage.getItem('myvideo').then(res => { setLike(JSON.parse(res)) }).catch(error => console.log('error!'));
       AsyncStorage.getItem('voca').then(res => { setVoca(JSON.parse(res)) }).catch(error => console.log('error!'));
    },[])
    const { data: likeData, loading, error } = useQuery(FETCH_VIDEOS, {
      variables: { show: 3, ids: like.join() }
    }) 
    if(loading){
      return (
       <CenterSpinner />
      )
    }
    if(error){
      console.log(error)
    }
    // const Refresh = () => {
    //   setRefresh(true)
    //   fetchData().then(() => {
    //     setRefresh(false)
    //   })
    // }
    // function fetchData() {
    //   console.log("fetch")
    // }
   function openShare() {
    Share.share({
      title: 'タイトル',
      message: 'Invite your friends to Etube!!'
    }, {}).then((result, activityType) => {
      if(result.action == Share.dismissedAction) {
        // シェアを中断した場合の処理(iOSのみ)
      } else if(result.action == Share.sharedAction) {
        // シェアを実行した場合(Androidの場合は常にここの処理が実行される)
      } else {
 
      }
    });
  }
    return (
      <ScrollView
       refreshControl={
         <RefreshControl
          refreshing={refresh}
        />
       }
      >
       <Center>
         <View style={{ 
           flex: 1,
           width: "100%",
           marginTop: 20,
           marginBottom: 20
         }}>
         <View style={{ width: "90%", backgroundColor: '#136FFF', marginLeft: "5%", marginRight: "5%", padding: 20, borderRadius: 10, shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 0,
           },
           shadowOpacity: 0.25,
           shadowRadius: 13,
           elevation: 1,
           flexDirection: "row"
           }}>
           <Icon name="user" size={40} color="white"　style={{ marginRight: 20, marginTop: 10}} />
           <View>
            <Text style={{ fontSize: 23, color: 'white'}}>{user.username ? user.username : "Normal Account"}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontSize: 12, color: 'white'}}>password: </Text>
           { !show ?  <Text style={{ fontSize: 12, color: 'white', marginRight: 4 }}>******</Text> : <Text style={{ fontSize: 12, color: 'white', marginRight: 4 }}>{user.password}</Text>}
           {  show ?   <Icon name="eye-slash" color="white" size={14} onPress={() => setShow(prev => !prev)} /> :  <Icon name="eye" color="white" size={14} onPress={() => setShow(prev => !prev)} /> }
            </View>
           </View>
         </View>
         </View>
         <View style={{ 
           flex: 3,
           width: "100%"
         }}>
          <View style={{ width: "90%", backgroundColor: 'white', marginLeft: "5%", marginRight: "5%", padding: 20, borderRadius: 10, shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 0,
           },
           shadowOpacity: 0.25,
           shadowRadius: 13,
           elevation: 1,
           alignItems: 'left',
           marginBottom: 20
           }}>
           <Text style={{ fontSize: 23, fontWeight: '700', marginBottom: 20 }}>Favorite Video</Text>
           { likeData.checkedVideo.length > 0 ?  (
             <View style={{ width: '100%'}}>
               <View>
               <FlatList
                 data={likeData.checkedVideo}
                 renderItem={({item})=>{
                   return <SearchCard
                   id={item.id}
                   title={item.title}
                   url={item.url}
                   view={item.view}
                   level={item.level}
                   />
                 }}
                 keyExtractor={item => item.id}
                />
                 
               </View>
               <View style={{ width: '100%'}}>
               { like.length > 3 && <TouchableOpacity onPress={() => navigation.navigate('AllVideo', { like: like.join()})}><Text style={{ textAlign: 'center',color: 'blue', marginTop: 10}}>Show all videos</Text></TouchableOpacity>}
               </View>
             </View>
           ):(
             <View style={{ width: '100%', marginTop: 50, marginBottom: 50}}>
             <Text style={{ color: 'black', textAlign: 'center'}}>No video was liked.</Text>
             </View>
           )}
          </View>
         </View>
         <View style={{ 
           flex: 3,
           width: "100%"
         }}>
          <View style={{ width: "90%", backgroundColor: 'white', marginLeft: "5%", marginRight: "5%", padding: 20, borderRadius: 10, shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 0,
           },
           shadowOpacity: 0.25,
           shadowRadius: 13,
           elevation: 1,
           alignItems: 'left',
           marginBottom: 20}}>
           
            <Text style={{ fontSize: 23, fontWeight: '700' }}>Vocabulary List</Text>
            {voca.length === 0 &&  
           (
          <>
           <View style={{ width: '100%', marginTop: 50, marginBottom: 50}}>
             <Text style={{ color: 'black', textAlign: 'center'}}>No word was registered.</Text>
           </View>
           <View style={{ width: '100%'}}>
           <TouchableOpacity onPress={() => navigation.navigate('Voca', { modal: true })}><Text style={{ textAlign: 'center',color: 'blue', marginTop: 10}}>Create Vocabulary List</Text></TouchableOpacity>
           </View>
          </>
           )}
            {voca.length !== 0 &&  
           (
          <View style={{ width: "100%", padding: 10}}>
           <TouchableOpacity onPress={() => navigation.navigate('Voca', { modal: false })}>
            <Image source={require('../../assets/word.png')} style={{ width: "80%", height: 190, marginLeft: 20}} /> 
           </TouchableOpacity>
          </View>
           )}
          </View>
         </View>
         <View style={{ 
           flex: 2,
           width: "100%"
         }}>
          <View style={{ width: "90%", backgroundColor: 'white', marginLeft: "5%", marginRight: "5%", padding: 20, borderRadius: 10, shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 0,
           },
           shadowOpacity: 0.25,
           shadowRadius: 13,
           elevation: 1,
           alignItems: 'left',
           marginBottom: 20}}>
          <View style={{ width: "100%", padding: 10}}>
          <TouchableOpacity onPress={openShare}>
            <Text style={{ fontSize: 23, fontWeight: '700' }}>Share Etube in SNS</Text>
            <Image source={require('../../assets/image.png')} style={{ width: "80%", height: 190, marginLeft: 20}} />
          </TouchableOpacity> 
          </View>
          </View>
         </View>
         <View style={{ 
           flex: 1,
           width: "100%"
         }}>
          <View style={{ width: "90%", backgroundColor: 'white', marginLeft: "5%", marginRight: "5%", padding: 20, borderRadius: 10, shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 0,
           },
           shadowOpacity: 0.25,
           shadowRadius: 13,
           elevation: 1,
           alignItems: 'left'}}>
          <TouchableOpacity onPress={() => setDialog(true)}>
           <Text style={{ fontSize: 23, fontWeight: '700' }}>Reset account</Text>
          </TouchableOpacity>
          <View>
             
          </View>
          </View>
         </View>
         <ConfirmDialog
                    title="Delete Account"
                    message="Are you sure??"
                    visible={dialog}
                    onTouchOutside={() => setDialog(false)}
                    positiveButton={{
                        title: 'Yes',
                        onPress: () => {
                            logout()
                        }
                    }}
                    negativeButton={{
                        title: 'No',
                        onPress: () => setDialog(false)
                    }}
                />
       </Center>
      </ScrollView>
    )
}

export const UserStack = () => {
  const navigation = useNavigation()
  return (
  <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" options={{ header: () => null }} component={User} />
      <Stack.Screen name="AllVideo" options={{ header: () => null }} component={AllVideo} />
      <Stack.Screen name="Voca" options={{header: () => null}} component={Voca} />
  </Stack.Navigator>
  )
}

export default User
