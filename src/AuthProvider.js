import React, { useState } from 'react'
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { AsyncStorage } from 'react-native';

export const AuthContext = React.createContext();

export const LOGIN_USER = gql`
 mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }){
        user {
            id
            username
        }
    }
 }
`
export const REGISTER = gql`
 mutation register($username: String!, $password: String!) {
   register(username: $username, password: $password) {
     user {
         id
         username
     }
     errors {
         message
     }
   }
 }
`


export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ like, setLike ] = useState([])
    const [ voca, setVoca ] = useState([])
    let list = []
    let vocaList = []
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            like,
            setLike,
            voca,
            setVoca,
            login: (input) => {
                const data = useMutation(LOGIN_USER, { variables: input })
                setUser(data)
                AsyncLocalStorage.setItem('user',JSON.stringify(data))
            },
            register: (input) => {
                setUser(input)
                AsyncStorage.setItem('user', JSON.stringify(input)).then(json => console.log(json)).catch(error => console.log('error!'));
                AsyncStorage.setItem('myvideo', JSON.stringify([1,2])).then(json => console.log(json)).catch(error => console.log('error!'))
                AsyncStorage.setItem('voca', JSON.stringify([])).then(json => console.log(json)).catch(err => console.log(err))
            },
            likeVideo: (id) => {
                AsyncStorage.getItem('myvideo').then(req => { setLike(JSON.parse(req))}).catch(error => console.log('error!'));
                list = like
                list.push(id)
                AsyncStorage.setItem('myvideo', JSON.stringify(list)).then(json => console.log('success!')).catch(error => console.log('error!'));
            }, 
            addWord: (word) => {
                AsyncStorage.getItem('voca').then(req => setVoca(JSON.parse(req))).catch(error => console.log(error))
                vocaList = voca
                vocaList.push(word)
                AsyncStorage.setItem('voca', JSON.stringify(vocaList)).then(json => console.log('success!')).catch(error => console.log('error!'));
            },
            deleteWord: (chosenWord) => {
                AsyncStorage.getItem('voca').then(req => setVoca(JSON.parse(req))).catch(error => console.log(error))
                vocaList = voca
                console.log(vocaList)
                const listingWord = vocaList.filter(word => {
                    return word.definition !== chosenWord.definition
                })
                AsyncStorage.setItem('voca', JSON.stringify(listingWord)).then(json => console.log('success!')).catch(error => console.log('error!'));
            },
            logout: () => {
                AsyncStorage.removeItem('user')
                setUser(null)
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}