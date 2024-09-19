import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import CartItem from "../components/CartItem";
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/orders";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../features/cart/cartSlice";

const Cart = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const localId = useSelector((state) => state.auth.localId);
  const [triggerPostOrder] = usePostOrderMutation();
  const dispatch = useDispatch();

  const handleAddOrder = () => {
    const createdAt = new Date().toLocaleString();
    const order = {
      ...cart,
      createdAt,
    };
    triggerPostOrder({ localId, order });
    dispatch(clearCart());
    navigation.navigate("OrdersStack");
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  if (cart.total === 0)
    return (
      <View style={styles.containervacio}>
        <Text style={styles.vacio}>Tu carrito esta vacio</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={handleRemoveItem}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
          />
        )}
      />
      <View style={styles.containerConfirm}>
        <Pressable onPress={handleAddOrder}>
          <Text style={styles.textConfirm}>Confirmar</Text>
        </Pressable>
        <Text style={styles.textConfirm}>Total: $ {cart.total.toFixed(2)} </Text>

      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  containervacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vacio: {
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  containerConfirm: {
    backgroundColor: colors.lightGray,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: colors.negro,
    borderWidth: 1,
  },
  textConfirm: {
    color: colors.negro,
    fontSize: 20,
    fontWeight: "bold",
  },
});
