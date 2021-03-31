import React, { useContext, useState } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Text, StatusBar, Image, AsyncStorage, Alert } from 'react-native'
import Center from '../component/Center';
import { AuthContext } from '../AuthProvider';

// export const REGISTER = gql`
//  mutation register($username: String!, $password: String!) {
//    register(username: $username, password: $password) {
//      user {
//          id
//          username
//      }
//      errors {
//          message
//      }
//    }
//  }
// `

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, register } = useContext(AuthContext)
    // if(loading){
    //     return (
    //         <CenterSpinner />
    //     )
    // }
    // if(error){
    //     Alert(error)
    // }
    // if(!loading && data){
    //     setUser(data.register.user)
    //     AsyncStorage.setItem('user', JSON.stringify(user.register.data))
    // }
    const onSubmit = async(e) => {
        e.preventDefault()
        const input = { username, password }
        register(input)
    }
    return (
        <Center>
            <Image style={styles.image} source={require("../../assets/favicon.png")} />
 
            <StatusBar style="auto" />
           <View style={styles.inputView}>
             <TextInput
               style={styles.TextInput}
               placeholder="Username"
               placeholderTextColor="#003f5c"
               onChangeText={(email) => setUsername(email)}
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
           {/* <TouchableOpacity onPress={() => navigation.navigate("login")}>
             <Text style={styles.forgot_button}>Already having an account?</Text>
           </TouchableOpacity> */}
           <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
             <Text style={styles.loginText}>REGISTER</Text>
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

export default Register
