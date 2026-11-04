
import useProducts from "@/context/ProductsContext";
import { router } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddProductScreen() {
  const { addProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const saveHandler = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Error", "Name and price are required");
      return;
    }

    try {
      const id = Date.now().toString();
      let savedImageUrl = "";

      if (imageUrl) {
        const folder = FileSystem.documentDirectory + "products/";

        const folderInfo = await FileSystem.getInfoAsync(folder);

        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folder, {
            intermediates: true,
          });
        }

        const extension =
          imageUrl.split(".").pop()?.split("?")[0] || "jpg";

        savedImageUrl = folder + id + "." + extension;

        await FileSystem.copyAsync({
          from: imageUrl,
          to: savedImageUrl,
        });
      }

      addProduct({
        id,
        name,
        price,
        description,
        imageUrl: savedImageUrl,
      });

      router.back();
    } catch (error) {
      Alert.alert("Error", "Product could not be saved");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Product</Text>

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
        onPress={pickImage}
      >
        <Text style={styles.btnText}>Choose Image</Text>
      </TouchableOpacity>

      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
      ) : null}

      <TouchableOpacity
        style={styles.btn}
        onPress={saveHandler}
      >
        <Text style={styles.btnText}>Save Product</Text>
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
    marginBottom: 15,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 8,
  },
  cancel: {
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
});
