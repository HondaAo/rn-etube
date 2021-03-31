import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Text, StatusBar, Image } from 'react-native'
import { AuthContext } from '../AuthProvider';
import Center from '../component/Center'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext)
    return (
        <Center>
            <Image style={styles.image} source={require("../../assets/favicon.png")} />
 
            <StatusBar style="auto" />
           <View style={styles.inputView}>
             <TextInput
               style={styles.TextInput}
               placeholder="Username"
               placeholderTextColor="#003f5c"
               onChangeText={(username) => setUsername(username)}
             />
           </View>
            
           <View style={styles.inputView}>
             <TextInput
               style={styles.TextInput}
               placeholder="Password"
               placeholderTextColor="#003f5c"
               secureTextEntry={true}
               onChangeText={(password) => setPassword(password)}
             />
           </View>
           <TouchableOpacity onPress={() => navigation.navigate("register")}>
             <Text style={styles.forgot_button}>Go to Register page</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.loginBtn} onPress={(e) => {
               e.preventDefault()
               const input = { username, password }
               login(input)
           }}>
             <Text style={styles.loginText}>LOGIN</Text>
           </TouchableOpacity>
        </Center>
    )
}
const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn: {
       width:"80%",
       borderRadius:25,
       height:50,
       alignItems:"center",
       justifyContent:"center",
       marginTop:40,
       backgroundColor:"#FF1493",
    },
    loginText: {
        color: "#FFF",
        fontWeight: "700"
    },
    image: {
        marginBottom: 40,
    },
})

export default Login
