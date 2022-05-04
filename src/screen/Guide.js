import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'

const Guide = () => {
  const navigation = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF'}}> 
        <View style={{ flex: 15, marginTop: 60, width: "90%", marginRight: "5%", marginBottom: 40 }}>
          <SliderBox
          images={[
            require('../../assets/iphone10.png'),
            require('../../assets/iphone8.png'),
            require('../../assets/iphone6.png'),
            require('../../assets/iphone7.png'),
          ]}
          sliderBoxHeight={800}
          dotColor="#FFEE58"
          parentWidth={Dimensions.get("screen").width}
          ImageComponentStyle={{borderRadius: 15}}
        /> 
        </View>  
        <View style={{ flex: 3}}>
        <TouchableOpacity style={{ width: "90%", marginRight: "5%", marginLeft: "5%", padding: 12, backgroundColor: '#F16522'}} onPress={() => navigation.navigate('register')}>
            <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 18}}>Let's Watch Funny Videos!!</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

export default Guide
