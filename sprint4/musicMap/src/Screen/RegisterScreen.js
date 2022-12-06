import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import storeUserSession from '../hooks/storeUserSession.js';

export default function RegisterScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [disableRegister, setDisableRegister] = useState(true);

    useEffect(() => {
        if (email.length > 0 && password.length > 0 && username.length > 0) {
            setDisableRegister(false);
        }
        else {
            setDisableRegister(true);
        }
    }, [email, password, username]);

    async function register(emailvar, usernamevar, passwordvar) {
        await fetch('http://192.168.1.12:3000/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailvar, username: usernamevar, password: passwordvar, location: [0, 0], roles: ['user'] }),
        })
            .then(res => res.json())
            .then(data => {
                storeUserSession(data);
            })
            .catch(err => { throw console.log(err); });
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24 }}>
                REGISTER
            </Text>
            <View>
                <TextInput
                    style={styles.inputField}
                    placeholder="Username"
                    onChangeText={(e) => setUsername(e)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.inputField}
                    placeholder="Email"
                    onChangeText={(e) => setEmail(e)}
                />
            </View>
            <View>
                <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity disabled={disableRegister} onPress={() => register(email, username, password)} style={styles.submitButton}>
                <Text style={styles.submitText}>
                    REGISTER
                </Text>
            </TouchableOpacity>
            <Text>
                Already have an account?
                <TouchableOpacity onPress={() => { navigation.pop(); }}>
                    <Text>
                        Login
                    </Text>
                </TouchableOpacity>
                instead.
            </Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
    submitButton: {
        backgroundColor: 'rgb(50,50,150)',
        borderRadius: 8,
        width: Dimensions.get('window').width - Dimensions.get('window').width / 1.5,
        marginTop: 34,
        marginBottom: 100,
    },
    submitText: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 6,
        paddingRight: 6,
    },
    inputField: {
        width: Dimensions.get('window').width - Dimensions.get('window').width / 5,
        backgroundColor: 'rgb(100,100, 200)',
        borderRadius: 12,
        paddingLeft: 12,
        marginTop: 20,
    },

});
