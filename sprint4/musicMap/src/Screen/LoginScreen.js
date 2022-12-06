import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import retrieveUserSession from '../hooks/retrieveUserSession';
import storeUserSession from '../hooks/storeUserSession';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableLogin, setDisableLogin] = useState(true);

    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setDisableLogin(false);
        }
        else {
            setDisableLogin(true);
        }
    }, [email, password]);

    useEffect(() => {
        retrieveUserSession().then(e => {
            if (e !== null) {
                navigation.replace('Navigator');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function login(emailvar, passwordvar, remembervar) {
        await fetch('http://192.168.1.12:3000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailvar, password: passwordvar, remember: remembervar }),
        })
            .then(res => res.json())
            .then(async data => {
                if (!data.error) {
                    console.log('data', JSON.stringify(data));
                    storeUserSession(data);
                }
            })
            .catch(err => { throw console.log(err); });
    }

    function verifyLogin() {
        retrieveUserSession().then(e => {
            if (e !== null) {
                navigation.replace('Navigator');
            }
        });
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24 }}>
                LOGIN
            </Text>
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
            <TouchableOpacity disabled={disableLogin} onPress={() => { login(email, password, false).then(() => verifyLogin()); }} style={styles.submitButton}>
                <Text style={styles.submitText}>
                    LOGIN
                </Text>
            </TouchableOpacity>
            <Text>
                Don't have an account?
                <TouchableOpacity onPress={() => { navigation.navigate('RegisterScreen'); }}>
                    <Text>
                        Register
                    </Text>
                </TouchableOpacity>
                instead.
            </Text>
        </View>
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
