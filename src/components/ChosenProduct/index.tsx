import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getSizes, getProductColor, getProduct, getSize } from "../api";
import { setChosenProduct, setCartProducts } from "../../reducer/reducer";
import { CartProduct, Product, Color, Size } from "../../reducer/reducer";
import styles from "./ChosenProduct.module.css";

type localColors = {
  id: number;
  name: string;
};

type Text = {
  isError: boolean;
  text: string;
};
type NewProduct = {
  productID: string;
  name: string;
  colorName: string;
  size: Size;
  price: string;
  images: string[];
};

const ChosenProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const cartProducts: CartProduct[] = useAppSelector((state) => state.catalog.cartProducts);
  const chosenProduct: Product | null = useAppSelector((state) => state.catalog.chosenProduct);
  const [colors, setColors] = useState<localColors[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [chosenColor, setChosenColor] = useState<Color | null>(null);
  const [activeSizes, setActiveSizes] = useState<number[]>([]);
  const [chosenSize, setChosenSize] = useState<Size | null>(null);
  const [text, setText] = useState<Text>({ isError: false, text: "" });
  const [chosenImage, setChosenImage] = useState<number>(0);

  const fakeGetReqChosenProduct = async (id: number): Promise<void> => {
    const data = await getProduct(id);
    dispatch(setChosenProduct(data));
  };

  const fakeGetReqProductColor = async (productID: number, colorID: number): Promise<void> => {
    const data = await getProductColor(productID, colorID);
    setChosenColor(data);
  };

  const fakeGetReqSize = async (id: number): Promise<void> => {
    const data = await getSize(id);
    setChosenSize(data);
  };

  const fakeGetReqProductSizes = async (): Promise<void> => {
    const data = await getSizes();
    setSizes(data);
  };

  const handleChooseColor = (colorID: number): void => {
    if (!chosenProduct) return;
    setText({ isError: false, text: "" });
    fakeGetReqProductColor(chosenProduct.id, colorID);
  };

  const handleChooseSize = async (sizeID: number): Promise<void> => {
    if (!chosenProduct) return;
    setText({ isError: false, text: "" });
    fakeGetReqSize(sizeID);
  };

  useEffect(() => {
    fakeGetReqChosenProduct(Number(location.split("/product/")[1]));
    const isCartData: CartProduct[] | null = JSON.parse(localStorage.getItem("myProducts")!);
    const fillCart: CartProduct[] = isCartData ? isCartData : [];

    dispatch(setCartProducts(fillCart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chosenProduct) return;

    fakeGetReqProductSizes();
    fakeGetReqProductColor(chosenProduct.id, 1);
    setColors(chosenProduct.colors.map((color: Color) => ({ id: color.id, name: color.name })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenProduct]);

  useEffect(() => {
    if (!chosenColor) return;
    setActiveSizes(chosenColor.sizes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenColor]);

  const backToProducts = (): void => {
    dispatch(setChosenProduct(null));
    navigate("/");
  };

  let timeout: any;

  const removeText = (): void => {
    timeout = setTimeout(() => {
      setText({ isError: false, text: "" });
    }, 5000);
  };

  useEffect(() => {
    if (text.text === "") clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showText = (text: Text): void => {
    clearTimeout(timeout);
    setText(text);
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

  const nextImage = (chosenImage: number): void => {
    setChosenImage(chosenColor?.images[chosenImage + 1] ? chosenImage + 1 : 0);
  };

  const prevImage = (chosenImage: number): void => {
    if (!chosenColor?.images?.length) return;
    setChosenImage(
      chosenColor?.images[chosenImage - 1] ? chosenImage - 1 : chosenColor?.images?.length - 1
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={backToProducts}>
        <h2>Вернуться к списку товаров</h2>
      </div>

      <div className={styles.items}>
        {chosenColor !== null ? (
          <div className={styles.item}>
            <div className={styles.imageBlock}>
              <img src={chosenColor.images[chosenImage]} alt="imageItem" />
            </div>
            <div className={styles.slider}>
              <button onClick={() => prevImage(chosenImage)}>{"<"}</button>
              <button onClick={() => nextImage(chosenImage)}>{">"}</button>
            </div>
            <p>{chosenColor.description}</p>
            <p>
              Цвета:{" "}
              {colors.map((color: any, index: number) => (
                <span
                  key={index}
                  className={`${styles.color} ${
                    index + 1 === chosenColor.id ? styles.active : styles.hover
                  }`}
                  onClick={() => handleChooseColor(color.id)}
                >
                  {color.name}
                </span>
              ))}
            </p>
            <p>
              Размеры:{" "}
              {sizes.map((size: any, index: number) => (
                <span
                  className={`${styles.size} ${!activeSizes.includes(size.id) && styles.disabled} ${
                    chosenSize?.id === size.id ? styles.active : styles.hover
                  }`}
                  key={index}
                  onClick={() => activeSizes.includes(size.id) && handleChooseSize(size.id)}
                >
                  {size.label}-{size.number}
                </span>
              ))}
            </p>
            <p>Цена: {chosenColor.price}</p>
            <div className={styles.buttonBlock}>
              <div className={styles.buttonBlockInner}>
                <button onClick={checkProduct}>Добавить в корзину</button>
                <div className={text.isError ? styles.textError : styles.textResolve}>
                  {text.text}
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Загрузка товаров"
        )}
      </div>
    </div>
  );
};

export default ChosenProduct;
