
import { createContext, useContext, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
};

type ProductsContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (
    id: string,
    name: string,
    price: string,
    description: string
  ) => void;
};

const initialProducts: Product[] = [];

const ProductsContext = createContext<
  ProductsContextType | undefined
>(undefined);

export function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (
    id: string,
    name: string,
    price: string,
    description: string
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, name, price, description }
          : product
      )
    );
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductsProvider"
    );
  }

  return context;
}
