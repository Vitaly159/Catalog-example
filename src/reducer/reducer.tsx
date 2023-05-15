import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Color = {
  id: number;
  name: string;
  description: string;
  price: string;
  images: string[];
  sizes: number[];
};

export type Product = {
  id: number;
  name: string;
  colors: Color[];
};

export type Size = {
  id: number;
  label: string;
  number: number;
};

export type CartProduct = {
  size: Size;
  colorName: string;
  name: string;
  price: string;
  productID: string;
  images: string[];
};

export type Text = {
  isError: boolean;
  text: string;
};

export type States = {
  products: Product[];
  pageName: string;
  chosenProduct: Product | null;
  cartProducts: any[];
  chosenColor: Color | null;
  chosenImage: number;
  notificationText: Text;
  chosenSize: Size | null
};

const initialState: States = {
  products: [],
  pageName: "Список товаров",
  chosenProduct: null,
  cartProducts: [],
  chosenColor: null,
  chosenImage: 0,
  notificationText: { isError: false, text: "" },
  chosenSize: null
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
    setChosenColor(state, action: PayloadAction<Color | null>) {
      state.chosenColor = action.payload;
    },
    setChosenImage(state, action: PayloadAction<number>) {
      state.chosenImage = action.payload;
    },
    setNotificationText(state, action: PayloadAction<Text>) {
      state.notificationText = action.payload;
    },
    setChosenSize(state, action: PayloadAction<Size | null>) {
      state.chosenSize = action.payload;
    },
  },
});

export const {
  setProducts,
  setPageName,
  setChosenProduct,
  setCartProducts,
  setChosenColor,
  setChosenImage,
  setNotificationText,
  setChosenSize
} = catalogSlice.actions;
export default catalogSlice.reducer;
