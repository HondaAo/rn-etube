import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const SearchCard = ({ id, title, url, view, level }) => {
    const navigation = useNavigation()
    return (
        <>
        <TouchableOpacity onPress={() => navigation.navigate('videoPlayer', { id, title })}>
        <View style={{ flexDirection: 'row', marginBottom: 10}}>
          <View style={{ width: "30%"}}>
          <Image 
           source={{uri:`https://i.ytimg.com/vi/${url}/hqdefault.jpg`}}
           style={{
               width:"100%",
               height: 70,
               borderRadius: 8
           }}/>
          </View> 
          <View style={{ width: "70%", paddingTop: 12, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600'}}>{title}</Text>
              <View style={{ flexDirection: 'row'}}>
               <Text style={{ marginRight: 10, marginTop: 10, color: 'gray'}}>{view} views</Text>
               <Text style={{ marginRight: 20, marginTop: 10,  color: 'gray'}}>{level} level</Text>
              </View>
          </View> 
        </View>
        </TouchableOpacity>
        </>
    )
}

export default SearchCard
