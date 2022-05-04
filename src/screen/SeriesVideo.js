import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import CenterSpinner from '../component/CenterSpinner';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../component/Card';
import SearchCard from '../component/SearchCard';

export const FETCH_VIDEOS = gql`
 query seriesVideo($series: String!){
   seriesVideo(series: $series){
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

const SeriesVideo = (props) => {
    const { data, error, loading } = useQuery(
        FETCH_VIDEOS,
      {
        variables: { series: props.route.params.series }
      }
    );
    if(loading){
        return (
            <CenterSpinner />
        )
    }
    if(error){
        console.log(error)
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', padding: 19}}>
          <View style={{ marginBottom: 12, }}>
              <Text style={{ fontWeight: "600", fontSize: 15}}>{props.route.params.series} ( {data.seriesVideo.length} ) </Text>
          </View>  
          <View>
            <FlatList
             data={data.seriesVideo}
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
        </View>
    )
}

export default SeriesVideo
