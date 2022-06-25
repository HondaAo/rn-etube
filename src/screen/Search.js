import React from 'react'
import { Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import  Header, { SearchHeader } from '../component/Header';
import Series from '../component/Series';
import Center from '../component/Center';
import Category from './Category';
import { useNavigation } from '@react-navigation/native';
import SeriesVideo from './SeriesVideo';

const Stack = createStackNavigator()

const Search = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1}}>
            <ScrollView>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20}}>
          <Text style={{ fontSize: 22, fontWeight: "700" }}>Category</Text>
            <View
             style={{ flexDirection: 'row'}}
            >
                <TouchableOpacity style={{ width: "46%", marginRight: '2%', padding: 10,backgroundColor: '#FFF',borderWidth: 1, borderColor: 'gray', marginTop: 20, borderRadius: 10}} onPress={() => navigation.navigate('Category', { category: "anime" })}>
                    <Text style={{ marginBottom: 3, fontWeight: '800', color: '#000', opacity: 0.7}}>ANIME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "46%", marginLeft: '2%', padding: 10,backgroundColor: '#FFF',borderWidth: 1, borderColor: 'gray', marginTop: 20, borderRadius: 10}} onPress={() => navigation.navigate('Category', { category: "sports" })}>
                    <Text style={{ marginBottom: 3, fontWeight: '800', color: '#000', opacity: 0.7}}>SPORTS</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity style={{ width: "46%", marginRight: '2%', padding: 10,backgroundColor: '#FFF',borderWidth: 1, borderColor: 'gray', marginTop: 20, borderRadius: 10}} onPress={() => navigation.navigate('Category', { category: "movie" })}>
                    <Text style={{ marginBottom: 3, fontWeight: '800', color: '#000', opacity: 0.7}}>MOVIE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "46%", marginLeft: '2%', padding: 10,backgroundColor: '#FFF',borderWidth: 1, borderColor: 'gray', marginTop: 20, borderRadius: 10}} onPress={() => navigation.navigate('Category', { category: "Travel" })}>
                    <Text style={{ marginBottom: 3, fontWeight: '800', color: '#000', opacity: 0.7}}>TRAVEL</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{ width: "46%", marginRight: '2%', padding: 10,backgroundColor: '#FFF',borderWidth: 1, borderColor: 'gray', marginTop: 20, borderRadius: 10}} onPress={() => navigation.navigate('Category', { category: "TV show" })}>
                    <Text style={{ marginBottom: 3, fontWeight: '800', color: '#000', opacity: 0.7}}>TV SERIES</Text>
                </TouchableOpacity>
            </View>
          </View> 
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20, paddingRight: 5}}>
              <Series series="Ted" />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20,  paddingRight: 5}}>
              <Series series="Expedia" />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20,  paddingRight: 5}}>
              <Series series="Football" />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20,  paddingRight: 5}}>
              <Series series="Charlie Brown" />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20,  paddingRight: 5}}>
              <Series series="Family Guy" />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20,  paddingRight: 5}}>
              <Series series="Friends" />
          </View>
          <View style={{ backgroundColor: 'white', marginTop: 10, padding: 20, paddingRight: 5}}>
              <Series series="Madagascar series" />
          </View> 
         </ScrollView>
        </View>
    )
}

export const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search"  options={{ header: () => null }} component={Search} />
            <Stack.Screen name="Category" options={{ header: () => null  }} component={Category} />
            <Stack.Screen name="Series" options={{ header: () => null }} component={SeriesVideo} />
        </Stack.Navigator>
    )
}

export default Search
