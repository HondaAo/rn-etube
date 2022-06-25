import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView, FlatList, SafeAreaView } from 'react-native'
import { useNavigation ,useTheme} from '@react-navigation/native';
import axios from 'axios';
const Series = ({ series }) => {
    const [ seriesVideos, setSeriesVideos ] = useState([])
    const navigation = useNavigation()
    const getSeriesVideos = async() => {
      const res = await axios.get(`/api/videos/seires/${series}`)
      setSeriesVideos(res.data)
    }
    useEffect(() => {
      getSeriesVideos()
    },[])
    return (
    <View style={{ flex: 1 }}>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
         <Text style={{ paddingLeft: 10, fontSize: 22 }}>{series}</Text>
         {seriesVideos.length > 4 && <TouchableOpacity onPress={()=>navigation.navigate("Series",{ series: series} )}><Text style={{ paddingRight: 12, color: 'blue'}}>Show All Videos</Text></TouchableOpacity>}
     </View>
         <SafeAreaView
         style={{ flexDirection: 'row' }}
          >
        {seriesVideos.length < 5 ? (
            <FlatList 
            data={seriesVideos}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                <View style={{ width: 310, marginRight: 20}}>
                    <View style={{ width: "100%", marginRight: '2%', marginTop: 20, borderRadius: 10}}>
                      <TouchableOpacity onPress={()=>navigation.navigate("videoPlayer",{ id: item.id, title: item.title } )}>
                       <Image 
                         source={{uri:`https://i.ytimg.com/vi/${item.url}/hqdefault.jpg`}}
                         style={{
                             width: "100%",
                             height:200,
                             borderRadius: 10
                         }}
                        />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: 15, fontWeight: "600"}}>{item.title}</Text>
                </View>
                )
            }}
            />
        ):(
        <>
        { seriesVideos.length > 0 && 
        (
            <FlatList 
            data={seriesVideos.slice(0, 4)}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                return (
                <View style={{ width: 310, marginRight: 20}}>
                    <View style={{ width: "100%", marginRight: '2%', marginTop: 20, borderRadius: 10}}>
                      <TouchableOpacity onPress={()=>navigation.navigate("videoPlayer",{ id: item.id, title: item.title } )}>
                       <Image 
                         source={{uri:`https://i.ytimg.com/vi/${item.url}/hqdefault.jpg`}}
                         style={{
                             width: "100%",
                             height:200,
                             borderRadius: 10
                         }}
                        />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginTop: 15, fontWeight: "600"}}>{item.title}</Text>
                </View>
                )
            }}
            />
        )}
        </>
        )}
        </SafeAreaView>
    </View>
    )
}

export default Series
