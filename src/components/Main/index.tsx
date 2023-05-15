import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setProducts, setPageName, setChosenProduct } from "../../reducer/reducer";
import { getProducts, getProduct } from "../fakeApi/api";
import { Product } from "../../reducer/reducer";
import styles from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products: Product[] = useAppSelector((state) => state.catalog.products);  
  const chosenProduct: Product | null = useAppSelector((state) => state.catalog.chosenProduct);
  const namePage: string = useAppSelector((state) => state.catalog.pageName);

  const fakeGetReqProducts = async (): Promise<void> => {
    const data = await getProducts();
    dispatch(setProducts(data));
  };

  const fakeGetReqChosenProduct = async (id: number): Promise<void> => {
    const data = await getProduct(id);
    dispatch(setChosenProduct(data));
  };

  useEffect(() => {
    fakeGetReqProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choseProduct = (id: number): void => {
    fakeGetReqChosenProduct(id);
  };

  useEffect(() => {
    if (!chosenProduct) return;

    navigate(`/product/${chosenProduct.id}`);
    dispatch(setPageName("Информация о товаре"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenProduct]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.currentPage}>
        <h2>{namePage}</h2>
      </div>

      <div className={styles.items}>
        {products.length
          ? products.map((product, index) => (
              <div className={styles.item} key={index} onClick={() => choseProduct(product.id)}>
                <div className={styles.image}>
                  {" "}
                  <img src={product.colors[0].images[0]} alt={"imageItem"} />
                </div>{" "}
                <p className={styles.name}>{product.name}</p>
              </div>
            ))
          : "Загрузка товаров..."}
      </div>
    </div>
  );
};

export default Main;
