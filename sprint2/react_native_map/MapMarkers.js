import React from 'react';
import { Marker } from 'react-native-maps';
import MarkerIcon from './MarkerIcon.js';
import { View } from 'react-native';

export default function MapMarkers(props) {
    return (
        <Marker {...props} coordinate={{ longitude: 4.3260017, latitude: 50.8436889 }}>
            <View>
                <MarkerIcon />
            </View>
        </Marker>
    );
}
