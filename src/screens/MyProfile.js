import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import SubmitButton from '../components/SubmitButton';
import { useGetUserQuery } from '../services/users';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { usePostUserLocationMutation } from '../services/users';

const MyProfile = ({ navigation }) => {
  const localId = useSelector(state => state.auth.localId);
  const { data: user, isSuccess, isLoading, isError, error } = useGetUserQuery({ localId });
  const [triggerPostUserLocation] = usePostUserLocationMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  // Comprobación para asegurar que el usuario está disponible
  if (isLoading) return <LoadingSpinner />;
  if (!isSuccess || !user) return <Text>Error al cargar el perfil.</Text>;

  const handleUpdateLocation = async (newLocation) => {
    const existingLocation = user.locations.find(loc => loc.id === newLocation.id);

    try {
      if (existingLocation) {
        await triggerPostUserLocation({
          localId,
          userLocation: {
            ...existingLocation,
            ...newLocation,
          },
          method: 'PATCH'
        });
      } else {
        await triggerPostUserLocation({ localId, userLocation: newLocation });
      }
    } catch (updateError) {
      console.error('Error al actualizar/agregar ubicación:', updateError);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={user.image ? { uri: user.image } : require("../../assets/profile_default.png")}
        resizeMode='cover'
        style={styles.image}
      />
      <SubmitButton title="Agregar imagen de perfil" onPress={() => navigation.navigate("ImageSelector")} />
      <SubmitButton 
        title="Agregar/Actualizar localización" 
        onPress={() => navigation.navigate("LocationSelector")} 
      />
      <FlatList
        data={user.locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    alignItems: "center",
    gap: 20
  },
  image: {
    width: 150,
    height: 150
  }
});
