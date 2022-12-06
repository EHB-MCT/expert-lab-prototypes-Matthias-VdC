import EncryptedStorage from 'react-native-encrypted-storage';

export default async function storeUserSession(token) {
    try {
        await EncryptedStorage.setItem('jwt', token.token);
        await EncryptedStorage.setItem('user', token.email);
        console.log('jwt & email stored succesfully');
    } catch (error) {
        // There was an error on the native side
        console.log(error);
    }
}
