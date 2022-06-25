import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Card from '../component/Card';
import SearchCard from '../component/SearchCard';

const Category = (props) => {
    const [ searchVideos, SetSearchVideos ] = useState()
    // const { data, error, loading } = useQuery(
    //   CATEGORY_VIDEOS,
    //   {
    //     variables: { category: props.route.params.category }
    //   }
    // );
    // if(loading){
    //     return (
    //         <CenterSpinner />
    //     )
    // }
    // if(error){
    //     console.log(error)
    // }
    const getCategoryVideos = async() => {
      const res = await axios.get(`/api/videos/categories/${props.route.params.category}`)
      SetSearchVideos(res.data)
    }
    useEffect(() => {
      getCategoryVideos()
    },[])
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF', padding: 19}}>
          <View style={{ marginBottom: 12, }}>
              { searchVideos && (<Text style={{ fontWeight: "600", fontSize: 15}}>{props.route.params.category} ( {searchVideos.length} ) </Text>)}
          </View>  
          <View>
            <FlatList
             data={searchVideos}
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

export default Category
