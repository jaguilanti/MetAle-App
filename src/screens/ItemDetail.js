import { Image, Pressable, StyleSheet, Text, View} from 'react-native'
import { colors } from '../global/colors'
import { addItemCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetProductQuery } from '../services/shop'
import LoadingSpinner from '../components/LoadingSpinner'

const ItemDetail = ({route}) => {

  const {id} = route.params
  const {data:product,isLoading} = useGetProductQuery(id)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleAddItemCart = () => {
    dispatch(addItemCart({...product,quantity:1}))
    navigation.navigate("CartStack")
  }

  if(isLoading) return <LoadingSpinner/>

  const imageUrl = product.images[1] || product.thumbnail;

  return (
    <View style={styles.container}>
      <View style={styles.containerDetail}>
        <Image
          style={styles.image}
          resizeMode='contain'
          source={{uri:imageUrl}}
        />
        <View style={styles.containerText}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Precio:  $ {product.price}</Text>
        </View>
        <Pressable style={styles.button} onPress={handleAddItemCart}>
          <Text style={styles.buttonText}>Comprar</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container:{
    width:"100%"
  },
  containerDetail:{
    alignItems:"center"
  },
  containerText:{
    width:"80%",
    gap:20,
    margin:20,
    marginHorizontal:"10%"
  },
  title:{
    fontSize:20
  },
  description:{
    fontSize:18
  },
  price:{
    fontSize:20,
    fontWeight:'bold'
  },
  image:{
    width:"100%",
    height:200,
    width:200,
    marginVertical:10
  },
  button:{
    width:"80%",
    marginHorizontal:"10%",
    backgroundColor:colors.green3,
    borderRadius:3,
    padding:10,
    alignItems:"center",
    justifyContent:"center",
    fontSize:20

  },
  buttonText:{
    fontSize:20,
    color:colors.negro,
    backgroundColor:colors.gris1,
    padding:5,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5

  }
})