import { Image, StyleSheet, View } from 'react-native';
import { mapStaticApi } from '../firebase/googleApi';

const MapPreview = ({ location }) => {
    const latitude = location.latitude || 40.7128; // Nueva York
    const longitude = location.longitude || -74.0060; // Nueva York

    const mapStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${latitude},${longitude}&key=${mapStaticApi}`;

    console.log(mapStaticUrl); // Verifica la URL

    return (
        <View>
            <Image
                source={{ uri: mapStaticUrl }}
                style={styles.image}
            />
        </View>
    );
};

export default MapPreview;

const styles = StyleSheet.create({
    image: {
        width: 350,
        height: 350,
        backgroundColor: "grey",
    },
});
