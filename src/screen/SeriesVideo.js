import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import CenterSpinner from '../component/CenterSpinner';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../component/Card';
import SearchCard from '../component/SearchCard';
import axios from 'axios';
const SeriesVideo = (props) => {
    const [ seriesVideos, setSeriesVideos ] = useState([])
    const getSeriesVideos = async() => {
      const res = await axios.get(`/api/videos/seires/${props.route.params.series}`)
      setSeriesVideos(res.data)
    }
    useEffect(() => {
      getSeriesVideos()
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', padding: 19}}>
          <View style={{ marginBottom: 12, }}>
              <Text style={{ fontWeight: "600", fontSize: 15}}>{props.route.params.series} ( {data.seriesVideo.length} ) </Text>
          </View>  
          <View>
            <FlatList
             data={seriesVideos}
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
