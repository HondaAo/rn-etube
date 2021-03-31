import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', minWidth: "100%", paddingLeft: 18, paddingRight: 18}}>
        <View style={{ flexDirection: 'row', paddingLeft: 10}}>
        <Icon
          name="etsy"
          size={24}
          color="black"
        /> 
        <Text style={{ marginTop: 9, marginRight: 180}}>tube</Text>  
        </View>
        <Icon
          name="etsy"
          size={24}
          color="white"
        /> 
        <Icon
          name="sort-amount-down"
          size={24}
          color="white"
        /> 
      </View>
    )
}

export default Header

export const UserHeader = () => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', minWidth: "100%", paddingLeft: 18, paddingRight: 18}}>
        <View style={{ flexDirection: 'row'}}>
        <Text style={{ fontWeight: "800", fontSize: 26}}>Profile</Text>
        </View>
      </View>
    )
}
export const SearchHeader = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', minWidth: "100%", paddingLeft: 18, paddingRight: 18}}>
        <View style={{ flexDirection: 'row'}}>
         <Text style={{ fontWeight: "800", fontSize: 26}}>Search</Text>
        </View>
      </View>
    )
}

