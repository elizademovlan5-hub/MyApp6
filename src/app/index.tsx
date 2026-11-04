
import useProducts from "@/context/ProductsContext";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { products } = useProducts();

  const navigationHandler = (item: any) => {
    router.push({
      pathname: "/product-details",
      params: { id: item.id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/add-product")}
      >
        <Text style={styles.btnText}>Add Product</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text>No products</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigationHandler(item)}
          >
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
              />
            ) : null}

            <Text style={styles.text}>{item.name}</Text>
            <Text>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
