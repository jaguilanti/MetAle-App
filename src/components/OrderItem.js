import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../global/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteOrderMutation } from '../services/orders';

const OrderItem = ({ item }) => {
    const navigation = useNavigation();
    const localId = useSelector(state => state.auth.localId); 
    const [deleteOrder] = useDeleteOrderMutation();

    const handleDeleteOrder = () => {
        Alert.alert(
            "Eliminar Orden",
            "¿Estás seguro de que deseas eliminar esta orden?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {                        
                        deleteOrder({ localId, orderId: item.id })
                        .unwrap() //Me permite manejar errores
                        .then(() => {                        
                            Alert.alert("Eliminacion exitosa", "Orden eliminada", [{ text: "OK" }]);                           
                            
                        })
                        .catch((error) => {
                            console.error("Error al eliminar la orden:", error);
                            Alert.alert("Error", "No se pudo eliminar la orden. Intenta nuevamente.", [{ text: "OK" }]);
                        });
                },
                style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.date}>{item.createdAt}</Text>
                <Text style={styles.total}>Total: {item.total} $</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.navigate("OrderDetail", { id: item.id })}>
                    <AntDesign name="search1" size={48} color="black" />
                </Pressable>
                <Pressable onPress={handleDeleteOrder} style={{ marginLeft: 10 }}>
                    <AntDesign name="delete" size={48} color="red" />
                </Pressable>
            </View>
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    container: {
        borderColor: colors.green3,
        borderWidth: 2,
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: 10,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 3,
    },
    containerText: {
        gap: 20,
    },
    date: {
        fontSize: 16,
    },
    total: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
