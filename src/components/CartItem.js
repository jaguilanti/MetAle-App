import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "../global/colors";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>$ {item.price} </Text>
        
        <View style={styles.actions1}>
          <Text>Cantidad:   <TouchableOpacity onPress={() => onDecrease(item.id)}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>   {item.quantity}   <TouchableOpacity onPress={() => onIncrease(item.id)}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity> </Text>
          
                  
        </View>
        
      </View>
      <View style={styles.actions}>
        
        <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
          <Entypo name="trash" size={48} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: colors.gris2,
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 3,
  },
  containerText: {
    width: "70%",
    gap: 5,
  },
  title: {
    color: colors.negro,
    fontSize: 20,
  },
  brand: {
    color: colors.negro,
    fontSize: 16,
  },
  price: {
    color: colors.negro,
    fontSize: 16,
    fontWeight: "bold",
  },
  actions1: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    top:1,   
  },
  actionText: {
    justifyContent:"center",
    fontSize: 24,
    top: 10,
  },
  removeButton: {
    marginLeft: 1, 
  },
});
