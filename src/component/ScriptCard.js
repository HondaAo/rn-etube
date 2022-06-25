import React, { useEffect } from 'react'
import { View, Text, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const ScriptCard = ({ scripts, subtitle, showId, skipTo , nextScript, play, setPlay}) => {
    useEffect(() => {
        const interval = setInterval(skipTo, 400); 
        return () => {
          clearInterval(interval);
        };
      },[skipTo]);
    if(showId > scripts.length){
       card = scripts[0]
    }
    let card = scripts[showId]
    return (
        <View style={{ width: "94%",marginLeft: 'auto',marginRight: 'auto', height: "100%", justifyContent: "center", flex: 1, borderColor: 'lightgray', borderWidth: 1 , padding: 10, backgroundColor: '#FFF', borderRadius: 4, shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.26,
        shadowRadius: 7,
        elevation: 5
        }}>
        <View style={{ flexDirection: 'row', width: "100%", alignItems: 'center'}}>
        { showId !== 0 ? (
          <Icon
         name="chevron-left"
         size={60}
         color="transparent"
         style={{ marginRight: 10, marginTop: 20, marginLeft: -25 }}
         onPress={() => nextScript('left')}
        />  
        ):(
        <Icon
         name="chevron-left"
         size={60}
         color="transparent"
         style={{ marginRight: 10, marginTop: 40, marginLeft: -25 }}
        />   
        )}
        { subtitle && card && <TouchableWithoutFeedback onPress={() => setPlay(prev => !prev)} style={{ height: "100%"}}>
         <Text style={{ textAlign: "left",lineHeight: 28, fontSize: 16, width: "84%", fontWeight: "600"}}>{' '}{card.text.replaceAll('.', '\n')}</Text>
        </TouchableWithoutFeedback>}
        { showId !== scripts.length - 1  ? (
        <Icon
          name="chevron-right"
          size={60} 
          color="transparent"
          style={{ marginLeft: 10, marginRight: 20 , marginTop: 20}}
          onPress={() => nextScript('right')}
        /> 
        ):(
        <Icon
            name="italic"
            size={60}
            color="transparent"
            style={{ marginLeft: 10, marginRight: 30 , marginTop: 40}}
          /> 
        )}
         </View>
        </View>
    )
}

export default ScriptCard
