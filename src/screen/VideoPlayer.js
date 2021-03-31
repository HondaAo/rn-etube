import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View,Dimensions, SafeAreaView, TouchableOpacity, Switch} from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import CenterSpinner from '../component/CenterSpinner';
import YoutubePlayer from 'react-native-youtube-iframe';
import Carousel from 'react-native-snap-carousel';
import ScriptCard from '../component/ScriptCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../AuthProvider';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const FETCH_VIDEO = gql`
 query watchVideo($id: Float!){
   watchVideo(id: $id) {
     id
     title
     url
     script
     end
     level
     view
   }
 }
`

const VideoPlayer = ({ route })=>{
   const { id ,title } = route.params
   const playerRef = useRef();
   const { likeVideo } = useContext(AuthContext)
   const [ activeSlide, setActiveSlide ] = useState(0);
   const [ playBack, setPlayBAck ] = useState(1)
   const [ play, setPlay ] = useState(true)
   const [ autoSlide, setAutoSlide ] = useState(0)
   const [ card, setCard ] = useState(0) 
   const [ showId, setShowId ] = useState(0)
   const [ subtitle, setSubtitle ] = useState(true)
   const { data, error, loading } = useQuery(
    FETCH_VIDEO,
    {
      variables: { id: id }
    }
  );
  if(loading){
      return (
          <CenterSpinner />
      )
  }
const scripts = JSON.parse(data.watchVideo.script)
const onChangeState = (state) => {
  if(state === 'ended'){
    setShowId(0)
  }
}
const skipTo = async() => {
  const elapsed_sec = await playerRef.current.getCurrentTime()
  if(scripts.length === 5){
    if(Math.ceil(elapsed_sec) === scripts[1].timestamp){
      setShowId(1)
    } if(Math.ceil(elapsed_sec) === scripts[2].timestamp){
      setShowId(2)
    }if(Math.ceil(elapsed_sec) === scripts[3].timestamp){
      setShowId(3)
    } if(Math.ceil(elapsed_sec) === scripts[4].timestamp){
      setShowId(4)
    }
  }
  if(scripts.length === 6){
    if(Math.ceil(elapsed_sec) === scripts[1].timestamp){
      setShowId(1)
    } if(Math.ceil(elapsed_sec) === scripts[2].timestamp){
      setShowId(2)
    }if(Math.ceil(elapsed_sec) === scripts[3].timestamp){
      setShowId(3)
    } if(Math.ceil(elapsed_sec) === scripts[4].timestamp){
      setShowId(4)
    }
      if(Math.ceil(elapsed_sec) === scripts[5].timestamp){
      setShowId(5)
    }
  }
  if(scripts.length === 7){
    if(Math.ceil(elapsed_sec) === scripts[1].timestamp){
      setShowId(1)
    } if(Math.ceil(elapsed_sec) === scripts[2].timestamp){
      setShowId(2)
    }if(Math.ceil(elapsed_sec) === scripts[3].timestamp){
      setShowId(3)
    } if(Math.ceil(elapsed_sec) === scripts[4].timestamp){
      setShowId(4)
    }
    if(Math.ceil(elapsed_sec) === scripts[5].timestamp){
      setShowId(5)
    }
    if(Math.ceil(elapsed_sec) === scripts[6].timestamp){
      setShowId(6)
    }
  }
  if(scripts.length === 8){
    if(Math.ceil(elapsed_sec) === scripts[1].timestamp){
      setShowId(1)
    } if(Math.ceil(elapsed_sec) === scripts[2].timestamp){
      setShowId(2)
    }if(Math.ceil(elapsed_sec) === scripts[3].timestamp){
      setShowId(3)
    } if(Math.ceil(elapsed_sec) === scripts[4].timestamp){
      setShowId(4)
    }
    if(Math.ceil(elapsed_sec) === scripts[5].timestamp){
      setShowId(5)
    }
    if(Math.ceil(elapsed_sec) === scripts[6].timestamp){
      setShowId(6)
    }
    if(Math.ceil(elapsed_sec) === scripts[7].timestamp){
      setShowId(7)
    }
  }
}
const nextScript = async(direction) => {
  if(direction === 'left'){
    if(showId === 0){
      return
    }
    await playerRef.current?.seekTo(scripts[showId - 1].timestamp + 0.1)
    setShowId(showId => showId - 1)
  }
  if(direction === 'right'){
    if(showId === scripts.length){
      return
    }
    await playerRef.current?.seekTo(scripts[showId + 1].timestamp + 0.1)
    setShowId(showId => showId + 1)
  }
}
   return(
       <View style={{
           flex:1,
        }}>
           <View style={{
               width:"100%",
               flex: 7
           }}>
              <YoutubePlayer
              ref={playerRef}
              height={240}
              videoId={data.watchVideo.url}
              playList={[data.watchVideo.url]}
              onFullScreenChange={false}
              play={play}
              initialPlayerParams={{
                showClosedCaptions: true,
                end: data.watchVideo.end,
                loop: 1,
                controls: 0
              }}
              playbackRate={playBack}
              onChangeState={onChangeState}
              />
           </View>
           <View style={{ paddingLeft: 20, backgroundColor: '#FFF', marginTop: -19, paddingTop: 10, flex: 2, paddingRight: 20}}>
           <Text style={{
               fontSize:20,
               width:Dimensions.get("screen").width - 50,
           }}
           ellipsizeMode="tail"

           >
             {data.watchVideo.title}
           </Text>
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
           <Text style={{ marginTop: 10,
             marginBottom: 10, opacity: 0.7}}>
             Level: {data.watchVideo.level}
           </Text>
           <View style={{ flexDirection: 'row', paddingLeft: 20, alignItems: 'center'}}>
           <Text style={{ opacity: 0.7, marginRight: -10 }}>Subtitle</Text>
           <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={subtitle ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setSubtitle(prev => !prev)}
              value={subtitle}
              style={{ marginLeft: 20}}
            />
            </View>
           </View>
           </View>
           <View
             style={{borderBottomWidth: 1, borderColor: 'lightgray'}}
           />
           <SafeAreaView style={{
               height: 280,
               backgroundColor: "#EEEEEE",
               marginTop: 15,
               flex: 9
           }}> 
           
            <View style={{ flex: 3, marginBottom: 10}}>
              <ScriptCard play={play} setPlay={setPlay} showId={showId} playerRef={playerRef} nextScript={nextScript} scripts={scripts} showId={showId} scriptsLength={scripts.length} skipTo={skipTo} subtitle={subtitle} /> 
             </View>
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -50, padding: 18, flex: 1, marginTop: -8 }}>
            <View style={{ backgroundColor: 'white' ,paddingLeft: 15, paddingRight: 15, paddingTop: 8,paddingTop: 5, paddingBottom: 5, borderRadius: 6,  height: 37, flexDirection: 'row', borderWidth:1, borderColor: "lightgray", shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.26,
  shadowRadius: 4,
  elevation: 5,}}>
              <Icon name="eye" size={20} style={{ marginRight: 12 }} color="black" />
              <Text style={{ marginTop: 2}}>{data.watchVideo.view}</Text>
            </View>
            <View style={{ backgroundColor: 'white' ,paddingLeft: 15, paddingRight: 15, paddingTop: 8, paddingBottom: 1, borderRadius: 6,  height: 37, borderWidth:1, borderColor: "lightgray", shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.26,
  shadowRadius: 4,
  elevation: 5,
  marginRight: 10}}>
              <Text>{showId + 1}/{scripts.length}</Text>
            </View>
            <View style={{ backgroundColor: 'white' ,paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 1, borderRadius: 6,  height: 37, borderWidth:1, borderColor: "lightgray", shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.26,
  shadowRadius: 4,
  elevation: 5,}}>
             <Icon name="thumbs-up" size={25} color="black" onPress={() => {
               likeVideo(id)
             }} />
            </View>
            </View>
           </SafeAreaView>
      </View>
   )
}

export default VideoPlayer