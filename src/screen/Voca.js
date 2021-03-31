import React, { useContext, useEffect, useState } from 'react'
import { AsyncStorage, Dimensions, Platform, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../AuthProvider';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
const Voca = ({ route }) => {
   const { modal } = route.params
   const { voca, setVoca, addWord, deleteWord } = useContext(AuthContext)
   const [ modalVisible, setModalVisible] = useState(modal);
   const [ word, setWord ] = useState("")
   const [ verb, setVreb ] = useState("")
   const [ definition, setDefinition ] = useState("")
   const deviceHeight = Dimensions.get("window").height;
   useEffect(() => {
    AsyncStorage.getItem('voca').then(res => { setVoca(JSON.parse(res)) }).catch(error => console.log('error!'));
   },[voca])
   return (
       <View>
        <View style={{ backgroundColor: 'white', width: '100%', marginTop: 20, padding: 20}}>
        <Text style={{ fontWeight: "600", fontSize: 28, textAlign: "center"}}>Words List</Text>
        <Text style={{ opacity: 0.6, textAlign: "center", marginTop: 10, marginBottom: 10 }}>Register your new vocabulary here</Text>
         <FlatList
          data={voca}
          renderItem={({item}) => {
              return(
                <View style={{ padding: 15}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                      <View>
                       <Text style={{ fontWeight: "600", fontSize: 23}}>{item.word}</Text>
                       <Text style={{ marginTop: 7, fontWeight: '500'}}>{item.verb}</Text>
                       <Text style={{ marginTop: 7, paddingRight: 20}}>Difinition: {item.definition}</Text>
                      </View>
                      <View style={{ paddingRight: 20}}>
                      <Icon name="trash" size={25} color="red" onPress={() => deleteWord(item)} />
                      </View>
                  </View>
                  <View style={{ borderColor: 'lightgray', borderWidth: 1, marginTop: 4}} />
                </View>
              )
          }}
          keyExtractor={item => item.id}
         />
        </View>
        <Modal
          swipeDirection="down"
          isVisible={modalVisible}
          deviceWidth={Dimensions.get("window").width}
          deviceHeight={deviceHeight}
          onSwipeComplete={() => setModalVisible(prev=>!prev)}
        >
        <View style={{ flex: 1,justifyContent: "flex-end" ,alignItems: "center",marginTop: 22, width: "100%" }}>
        <View style={{ shadowColor: "#000", shadowOffset: {   width: 0,   height: 0, }, shadowOpacity: 0.26, shadowRadius: 4, elevation: 5, backgroundColor: '#FFF', marginTop: 40,paddingTop: 80,paddingBottom: 80,  width: "100%", alignItems: 'center', borderRadius: 30}}>
        <View style={{ marginBottom: 30}}>
         <Text style={{ textAlign: 'left', fontWeight: '700', fontSize: 20}}>New Vocabulary</Text>
        </View>
        <View style={{ backgroundColor: "#FFF", borderRadius: 30, width: "70%", height: 45,marginBottom: 30,paddingLeft:10, borderColor: "lightgray", borderBottomWidth: 2}}>
         <TextInput
           style={{ height: 50, flex: 1, padding: 10,}}
           placeholder="Vocabulary"
           placeholderTextColor="#000"
           onChangeText={(word) => setWord(word)}
          />
        </View>
        <View style={{ backgroundColor: "#FFF", borderRadius: 30, width: "70%", height: 45,marginBottom: 30,paddingLeft:10, borderColor: "lightgray", borderBottomWidth: 2}}>
         <TextInput
           style={{ height: 50, flex: 1, padding: 10,}}
           placeholder="Word class"
           placeholderTextColor="#000"
           onChangeText={(word) => setVreb(word)}
          />
        </View>
        <View style={{ backgroundColor: "#FFF", borderRadius: 30, width: "70%", height: 45,marginBottom: 30,paddingLeft:10, borderColor: "lightgray", borderBottomWidth: 2}}>
         <TextInput
           style={{ height: 50, flex: 1, padding: 10}}
           placeholder="Definitiaon"
           placeholderTextColor="#000"
           onChangeText={(word) => setDefinition(word)}
           multiline={true}
          />
        </View>
        <View style={{ backgroundColor: "#FF1493", width: "70%", height: 45,marginBottom: 30, alignItems: "center"}}>
         <TouchableOpacity style={{ height: 50, padding: 14, flex: 1}} onPress={() => {
             const voca = { word, verb, definition };
             addWord(voca)
             setModalVisible(!modalVisible)
         }}>
             <Text style={{ color: '#FFF', fontWeight: '600'}}>REGISTER</Text>
         </TouchableOpacity>
        </View>
        </View>
         </View>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ width:"80%",borderRadius:25, height:50,alignItems:"center",justifyContent:"center",marginTop:40,backgroundColor:"#FF1493", marginLeft: "10%", marginRight: '10%'}}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 17}}>Add Vocabulary</Text>
        </TouchableOpacity>
       </View>
   )
}

export default Voca
