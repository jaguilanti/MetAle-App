import { Pressable, StyleSheet, Text, Image, View,StatusBar,Platform } from 'react-native'
import '../global/colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { deleteSession } from '../db'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { colors } from '../global/colors';

const Header = ({title,showBackButton}) => {

  const dispatch = useDispatch()
  const idToken = useSelector(state => state.auth.idToken)

  const onLogout = () =>{
    deleteSession()
    dispatch(clearUser())
  }
  return (
    <View style={styles.container}>
      {showBackButton && (
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="black" />
        </Pressable>
      )}
      <Image
        source={require("../../assets/img/logomet-sf.png")}
        style={styles.logo}
      />
      {idToken && !showBackButton && (
        <Pressable onPress={onLogout} style={styles.logout}>
          <MaterialIcons name="logout" size={30} color="black" />
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: 'grey',
    width: '100%',
  },
  logo: {
    width: 500,
    height: 150,
    bottom: 20,
  },
  title: {
    position: 'absolute',
    bottom: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: 'Josefin',
  },
  logout: {
    position: "absolute",
    right: 20,
    bottom: 50,
  },
  backButton: {
    position: "absolute",
    right: 30,
    bottom: 80,
  },
});
