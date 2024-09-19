import { FlatList, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem";
import { useGetProductsQuery } from "../services/shop";
import LoadingSpinner from "../components/LoadingSpinner";
import { colors } from "../global/colors";

const ItemListCategories = ({ route }) => {
  const { category } = route.params;
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery(category);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setProductsFiltered(products);
    }
  }, [products, isSuccess]);

  const onSearch = (input) => {
    if (input) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
      );
      setProductsFiltered(filtered);
    } else {
      setProductsFiltered(products);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Search onSearch={onSearch} />
      <FlatList
        contenContainerStyle={styles.ItemList}
        data={productsFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  ItemList: {
    flex:1,
    justifyContent:"space-around",
    width: "100%",
    height: 50,
  },
});
