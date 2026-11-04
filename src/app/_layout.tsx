
import { ProductsProvider } from "@/context/ProductsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ProductsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="product-details"
          options={{ title: "Product Details" }}
        />
        <Stack.Screen
          name="add-product"
          options={{ title: "Add Product" }}
        />
      </Stack>
    </ProductsProvider>
  );
}
