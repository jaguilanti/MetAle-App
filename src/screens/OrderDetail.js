import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetOrderByUserQuery } from '../services/orders';

const OrderDetail = ({ route }) => {
    const { id } = route.params;
    const localId = useSelector(state => state.auth.localId);
    const { data: order, isSuccess } = useGetOrderByUserQuery({ localId, orderId: id });

    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (isSuccess) {
            setOrderDetails(order);
        }
    }, [isSuccess, order]);

    return (
        <View style={styles.container}>
            {orderDetails ? (
                <>
                    <Text style={styles.title}>Detalles de la Orden:</Text>
                    <Text>ID: {orderDetails.id}</Text>
                    <Text>Fecha: {orderDetails.createdAt}</Text>
                    <Text>Total: $ {orderDetails.total} </Text> 
                    <Text>Items:</Text>
                    {orderDetails.items.map((item) => (
                        <Text key={item.id}>{item.title} - Cantidad: {item.quantity}</Text>
                    ))}
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
};

export default OrderDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
