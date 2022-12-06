import EncryptedStorage from 'react-native-encrypted-storage';

export default async function retrieveUserSession() {
    try {
        const session = await EncryptedStorage.getItem('jwt');
        console.log('session', session);

        if (session !== null) {
            return session;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
