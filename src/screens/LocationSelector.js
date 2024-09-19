import { StyleSheet, Text, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import SubmitButton from '../components/SubmitButton';
import { mapStaticApi } from '../firebase/googleApi';
import { useSelector } from 'react-redux';
import { useUpdateUserLocationMutation } from '../services/users';

const LocationSelector = ({ navigation }) => {
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [address, setAddress] = useState('');
    const localId = useSelector(state => state.auth.localId);
    const [triggerUpdateUserLocation] = useUpdateUserLocationMutation(); 

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permiso de ubicación denegado", "No se puede acceder a la ubicación. Habilita los permisos en la configuración.", [{ text: "OK" }]);
                return;
            }

            const newLocation = await Location.getCurrentPositionAsync();
            setLocation({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
            });
        };

        requestLocationPermission();
    }, []);

    useEffect(() => {
        const fetchAddress = async () => {
            if (location.latitude && location.longitude) {
                try {
                    const urlReverseGeoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapStaticApi}`;
                    const response = await fetch(urlReverseGeoding);
                    const data = await response.json();
                    setAddress(data.results[0]?.formatted_address || '');
                } catch (error) {
                    console.error("Error fetching address:", error);
                }
            }
        };

        fetchAddress();
    }, [location]);

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setLocation({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    };

    const handleConfirmLocation = async () => {
        const userLocation = {
            ...location,
            address,
        };
        
        // Llamar a la mutación de actualización
        await triggerUpdateUserLocation({ localId, userLocation });
        Alert.alert("Ubicación actualizada", "Tu ubicación se ha actualizado correctamente.");
        navigation.navigate('MyProfile');
    };

    return (
        <View style={styles.container}>
            <Text>Dirección: {address}</Text>
            {location.latitude !== 0 && location.longitude !== 0 && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01, 
                    }}
                    onPress={handleMapPress} 
                >
                    <Marker coordinate={location} />
                </MapView>
            )}
            <SubmitButton title="Confirmar Ubicación" onPress={handleConfirmLocation} />
        </View>
    );
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
        justifyContent: 'center',
        alignItems: "center"
    },
    map: {
        width: '100%',
        height: 200,
    },
});
