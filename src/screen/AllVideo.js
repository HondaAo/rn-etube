import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import CenterSpinner from '../component/CenterSpinner';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../component/Card';
import SearchCard from '../component/SearchCard';

export const FETCH_VIDEOS = gql`
  query checkedVideo($show: Float!, $ids: String!){
  checkedVideo (show: $show, ids: $ids ){
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

const AllVideo = ({ route }) => {
    const { like } = route.params
    const { data, error, loading } = useQuery(
        FETCH_VIDEOS,
      {
        variables: { ids: like, show: 100 }
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
              <Text style={{ fontWeight: "600", fontSize: 15}}>Liked Videos({data.checkedVideo.length})</Text>
          </View>  
          <View>
            <FlatList
             data={data.checkedVideo}
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

export default AllVideo
