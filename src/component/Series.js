import React from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView, FlatList, SafeAreaView } from 'react-native'
import CenterSpinner from '../component/CenterSpinner';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { useNavigation ,useTheme} from '@react-navigation/native';

export const FETCH_VIDEOS = gql`
 query seriesVideo($series: String!){
   seriesVideo(series: $series){
     id
     title
     url
     view
     script
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
    if(loading){
        return (
            <CenterSpinner />
        )
    }
    return (
    <View style={{ flex: 1 }}>
         <SafeAreaView
         style={{ flexDirection: 'row' }}
          >
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
        </SafeAreaView>
    </View>
    )
}

export default Series
