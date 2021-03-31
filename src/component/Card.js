import React from 'react';
import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { useNavigation ,useTheme} from '@react-navigation/native';
const Card = ({ title, url, id, view, level })=>{
    const navigation = useNavigation()
    //const {colors} = useTheme()
    //const textcolor = colors.iconColor
  return(
    <>
    <TouchableOpacity
      onPress={()=>navigation.navigate("videoPlayer",{ id: id, title: title } )}
      >
      <View style={{marginBottom:10}}
      
      >
          <Image 
           source={{uri:`https://i.ytimg.com/vi/${url}/hqdefault.jpg`}}
           style={{
               width:"100%",
               height:200,
               borderRadius: 20
           }}
           
          />
     <View style={{
         margin:5,
     }}>
         <View
         style={{
            marginLeft:10,
         }}
         >
            <Text style={{
                 fontSize:20,
                 width:Dimensions.get("screen").width - 50,

             }}
             ellipsizeMode="tail"
             numberOfLines={2}
             >{title}</Text>
             <View style={{  flexDirection: 'row' }}>
             <Text style={{
                 fontSize:15,
                 color: "gray",
                 marginRight: 0,
                 marginTop: '2%'
             }}
             ellipsizeMode="tail"
             numberOfLines={2}
             >{view} views</Text>
             <Text style={{
                 fontSize:15,
                 color: "gray",
                 marginLeft: 10,
                 marginTop: '2%'
             }}
             ellipsizeMode="tail"
             numberOfLines={2}
             >{level} level</Text>
             </View>
         </View>
         
     </View>
     </View>
     </TouchableOpacity>
     <View
  style={{
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  }}
/>
     </>
  )
}

export default Card