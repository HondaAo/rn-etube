import React, { useEffect } from 'react'
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const ScriptCard = ({ scripts, subtitle, showId, skipTo , nextScript, play, setPlay}) => {
    useEffect(() => {
        const interval = setInterval(skipTo, 1000); 
        return () => {
          clearInterval(interval);
        };
      }, []);
    if(showId > scripts.length){
       card = scripts[0]
    }
    let card = scripts[showId]
    console.log(play)
    return (
        <View style={{ width: "92%",marginLeft: 'auto',marginRight: 'auto', height: "100%", justifyContent: "center", flex: 1, borderColor: 'lightgray', borderWidth: 1 , padding: 10, backgroundColor: '#FFF', borderRadius: 4, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.26,
        shadowRadius: 7,
        elevation: 5
        }}>
        <View style={{ flexDirection: 'row', width: "100%"}}>
        { showId !== 0 ? (
          <Icon
         name="italic"
         size={60}
         color="white"
         style={{ marginRight: 10, marginTop: 20, marginLeft: -10 }}
         onPress={() => nextScript('left')}
        />  
        ):(
        <Icon
         name="italic"
         size={60}
         color="white"
         style={{ marginRight: 10, marginTop: 40, marginLeft: -10 }}
        />   
        )}
        { subtitle && <TouchableWithoutFeedback onPress={() => setPlay(prev => !prev)} style={{ height: "100%"}}>
        <Text style={{ textAlign: "left",lineHeight: 28, fontSize: 16, width: "80%", fontWeight: "600"}}>{card.text}</Text>
        </TouchableWithoutFeedback>}
        { showId !== scripts.length - 1  ? (
        <Icon
          name="italic"
          size={60} 
          color="white"
          style={{ marginLeft: 5, marginRight: 0 , marginTop: 20}}
          onPress={() => nextScript('right')}
        /> 
        ):(
        <Icon
            name="italic"
            size={60}
            color="white"
            style={{ marginLeft: 10, marginRight: 30 , marginTop: 40}}
          /> 
        )}
         </View>
         {/* <Text style={{ textAlign: 'right', marginTop: 10, marginRight: 50 }}>{card.id}/{scriptsLength}</Text>     */}
        </View>
    )
}

export default ScriptCard
