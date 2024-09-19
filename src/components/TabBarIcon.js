import { StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';

const TabBarIcon = ({text,icon,focused}) => {
  return (
    <View style={styles.container}> 
       <Entypo 
        style={styles.icon} 
        name={icon} size={24} 
        color={focused ? "black" : "black"} 
       />
       <Text style={{color:focused ? "black" : "black"}}>{text}</Text>
    </View>
  )
}

export default TabBarIcon

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        gap:5
    }
})