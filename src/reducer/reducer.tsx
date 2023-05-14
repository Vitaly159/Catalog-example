import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Color = {
  id: number,
  name: string,
  description: string,
  price: string,
  images: string[],
  sizes: number[]
}

export type Product = {
  id: number,
  name: string,
  colors: Color[]
}

export type Size = {
  id: number,
  label: string,
  number: number
}

export type CartProduct = {
  colorName: string,
  name: string,
  price: string,
  productID: string,
  images: string[],
  size: Size
}

export type States = {
  products: Product[];
  pageName: string;
  chosenProduct: Product | null;
  cartProducts: any[];
};

const initialState: States = {
  products: [],
  pageName: "Список товаров",
  chosenProduct: null,
  cartProducts: [],
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,

  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setPageName(state, action: PayloadAction<string>) {
      state.pageName = action.payload;
    },
    setChosenProduct(state, action: PayloadAction<Product | null>) {
      state.chosenProduct = action.payload;
    },
    setCartProducts(state, action: PayloadAction<any[]>) {
      state.cartProducts = action.payload;
    },
  },
});

export const { setProducts, setPageName, setChosenProduct, setCartProducts } = catalogSlice.actions;
export default catalogSlice.reducer;
