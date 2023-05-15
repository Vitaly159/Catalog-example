import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { getProduct, getSizes, getProductColor } from "../fakeApi/api";
import { setChosenProduct, setCartProducts, setChosenColor } from "../../reducer/reducer";
import { CartProduct, Product, Color, Size } from "../../reducer/reducer";
import SliderButtons from "./SliderButtons";
import ColorsButtons from "./ColorsButtons";
import SizesButtons from "./SizesButtons";
import AddInCartButton from "./AddInCartButton";
import styles from "./ChosenProduct.module.css";

type localColors = {
  id: number;
  name: string;
};

const ChosenProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const chosenProduct: Product | null = useAppSelector((state) => state.catalog.chosenProduct);
  const chosenColor: Color | null = useAppSelector((state) => state.catalog.chosenColor);
  const chosenImage: number = useAppSelector((state) => state.catalog.chosenImage);
  const chosenSize: Size | null = useAppSelector((state) => state.catalog.chosenSize);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [activeSizes, setActiveSizes] = useState<number[]>([]);
  const [colors, setColors] = useState<localColors[]>([]);

  const fakeGetReqChosenProduct = async (id: number): Promise<void> => {
    const data = await getProduct(id);
    dispatch(setChosenProduct(data));
  };

  const fakeGetReqProductSizes = async (): Promise<void> => {
    const data = await getSizes();
    setSizes(data);
  };

  const fakeGetReqProductColor = async (productID: number, colorID: number): Promise<void> => {
    const data = await getProductColor(productID, colorID);
    dispatch(setChosenColor(data));
  };

  useEffect(() => {
    if (!chosenProduct) return;

    fakeGetReqProductSizes();
    fakeGetReqProductColor(chosenProduct.id, 1);
    setColors(chosenProduct.colors.map((color: Color) => ({ id: color.id, name: color.name })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenProduct]);

  useEffect(() => {
    fakeGetReqChosenProduct(Number(location.split("/product/")[1]));
    const isCartData: CartProduct[] | null = JSON.parse(localStorage.getItem("myProducts")!);
    const fillCart: CartProduct[] = isCartData ? isCartData : [];

    dispatch(setCartProducts(fillCart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chosenColor) return;
    setActiveSizes(chosenColor.sizes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenColor]);

  const backToProducts = (): void => {
    dispatch(setChosenColor(null))
    dispatch(setChosenProduct(null));
    navigate("/");
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
            <SliderButtons />
            <p>{chosenColor.description}</p>
            <ColorsButtons colors={colors} fakeGetReqProductColor={fakeGetReqProductColor} />
            <SizesButtons sizes={sizes} activeSizes={activeSizes} chosenSize={chosenSize} />
            <p>Цена: {chosenColor.price}</p>
            <AddInCartButton activeSizes={activeSizes} />
          </div>
        ) : (
          "Загрузка товаров"
        )}
      </div>
    </div>
  );
};

export default ChosenProduct;
