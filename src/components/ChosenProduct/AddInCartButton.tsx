import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CartProduct, Product, Text, Size, Color } from "../../reducer/reducer";
import { setNotificationText, setCartProducts } from "../../reducer/reducer";
import styles from "./ChosenProduct.module.css";

type NewProduct = {
  productID: string;
  name: string;
  colorName: string;
  size: Size;
  price: string;
  images: string[];
};

type Props = {
  activeSizes: number[];
};

const AddInCartButton = ({ activeSizes }: Props) => {
  const dispatch = useAppDispatch();
  const chosenProduct: Product | null = useAppSelector((state) => state.catalog.chosenProduct);
  const cartProducts: CartProduct[] = useAppSelector((state) => state.catalog.cartProducts);
  const notificationText: Text = useAppSelector((state) => state.catalog.notificationText);
  const chosenSize: Size | null = useAppSelector((state) => state.catalog.chosenSize);
  const chosenColor: Color | null = useAppSelector((state) => state.catalog.chosenColor);

  let timeout: any;

  const removeText = (): void => {
    timeout = setTimeout(() => {
      dispatch(setNotificationText({ isError: false, text: "" }));
    }, 5000);
  };

  useEffect(() => {
    if (notificationText.text === "") clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationText]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showText = (text: Text): void => {
    clearTimeout(timeout);
    dispatch(setNotificationText(text));
    removeText();
  };

  const checkErrors = (): true | undefined => {
    if (activeSizes.length === 0) {
      showText({ isError: true, text: "Нет доступных размеров для заказа" });
      return true;
    }

    if (chosenSize === null) {
      showText({ isError: true, text: "Выберите размер!" });
      return true;
    }

    if (!activeSizes.includes(chosenSize.id)) {
      showText({ isError: true, text: "Выберите размер из доступных" });
      return true;
    }
  };

  const productIsInCart = (isCartData: CartProduct[], productID: string): true | undefined => {
    dispatch(setCartProducts(isCartData));

    if (cartProducts.find((item) => item.productID === productID)) {
      showText({ isError: false, text: "Товар уже есть в корзине" });
      return true;
    }
  };

  const addProductInCart = (productID: string, fillCart: CartProduct[]): void => {
    if (!chosenColor || !chosenSize) return;

    const product: NewProduct = {
      productID: productID,
      name: chosenColor.description,
      colorName: chosenColor.name,
      size: chosenSize,
      price: chosenColor.price,
      images: chosenColor.images,
    };

    const update: NewProduct[] = [...cartProducts, product];
    localStorage.setItem("myProducts", JSON.stringify(update));
    dispatch(setCartProducts(JSON.parse(localStorage.getItem("myProducts")!)));
    showText({ isError: false, text: "Товар добавлен" });
  };

  const checkProduct = (): void => {
    if (checkErrors()) return;

    const productID: string = `${chosenProduct?.id}-${chosenColor?.id}-${chosenSize?.id}`;
    const isCartData: CartProduct[] | null = JSON.parse(localStorage.getItem("myProducts")!);
    const fillCart: CartProduct[] = isCartData ? isCartData : [];

    if (productIsInCart(fillCart, productID)) return;
    addProductInCart(productID, fillCart);
  };

  return (
    <div className={styles.buttonBlock}>
      <div className={styles.buttonBlockInner}>
        <button onClick={checkProduct}>Добавить в корзину</button>
        <div className={notificationText.isError ? styles.textError : styles.textResolve}>
          {notificationText.text}
        </div>
      </div>
    </div>
  );
};

export default AddInCartButton;
