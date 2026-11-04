
import useProducts from "@/context/ProductsContext";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { products, updateProduct } = useProducts();

  const product = products.find((p) => p.id === id);

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(product?.price ?? "");
  const [description, setDescription] = useState(
    product?.description ?? ""
  );

  const saveHandler = () => {
    if (!product || !name.trim() || !price.trim()) {
      return;
    }

    updateProduct(id, name, price, description);

    router.back();
  };

  if (!product) {
    return (
      <View>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Product</Text>

      {product.imageUrl ? (
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
        />
      ) : null}

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Product name"
      />

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Price"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={saveHandler}
      >
        <Text style={styles.btnText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    width: "100%",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancel: {
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});
