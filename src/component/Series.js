import React from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView, FlatList, SafeAreaView } from 'react-native'
import CenterSpinner from '../component/CenterSpinner';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { useNavigation ,useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
export const FETCH_VIDEOS = gql`
 query seriesVideo($series: String!){
   seriesVideo(series: $series){
     id
     title
     url
     view
     script
     level
     created
   }
 }
`
const Series = ({ series }) => {
    const navigation = useNavigation()
    const { data, error, loading } = useQuery(
        FETCH_VIDEOS,
        {
          variables: { series }
        }
    );
    let showFive;
    if(loading){
        return (
            <CenterSpinner />
        )
    }
    return (
    <View style={{ flex: 1 }}>
     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
         <Text style={{ paddingLeft: 10, fontSize: 22 }}>{series}</Text>
         {data.seriesVideo.length > 4 && <TouchableOpacity onPress={()=>navigation.navigate("Series",{ series: series} )}><Text style={{ paddingRight: 12, color: 'blue'}}>Show All Videos</Text></TouchableOpacity>}
     </View>
         <SafeAreaView
         style={{ flexDirection: 'row' }}
          >
        {data.seriesVideo.length < 5 ? (
            <FlatList 
            data={data.seriesVideo}
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
            <FlatList 
            data={data.seriesVideo.slice(0, 4)}
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
        </>
        )}
        </SafeAreaView>
    </View>
    )
}

export default Series
