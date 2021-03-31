import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Image, View, TouchableOpacity, Text } from 'react-native'

const Today = ({ id, title, url, view, level }) => {
    const navigation = useNavigation()
    return (
        <View style={{ width: 280, marginRight: 30 }}>
            <View style={{ width: "100%", minHeight: 120, marginTop: 20, borderRadius: 10}}>
              <TouchableOpacity onPress={()=>navigation.navigate("videoPlayer",{ id: id, title: title } )}>
               <Image 
                 source={{uri:`https://i.ytimg.com/vi/${url}/hqdefault.jpg`}}
                 style={{
                     width:"100%",
                     height:160,
                     borderRadius: 10
                 }}
                />
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 15, fontWeight: "600", paddingLeft: 20}}>{title}</Text>
        </View>
    )
}

export default Today
