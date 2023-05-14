import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { setCartProducts } from "../../reducer/reducer";
import ProductCard from "../ProductCard";
import { CartProduct } from "../../reducer/reducer";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartProducts: CartProduct[] = useAppSelector((state) => state.catalog.cartProducts);

  const backToProducts = () => {
    navigate("/");
  };

  useEffect(() => {
    const isCartData: CartProduct[] | null = JSON.parse(localStorage.getItem("myProducts")!);
    const fillCart: CartProduct[] = isCartData ? isCartData : [];
    dispatch(setCartProducts(fillCart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={backToProducts}>
        <h2>Вернуться к списку товаров</h2>
      </div>

      {cartProducts.length ? (
        <div className={styles.products}>
          {cartProducts.map((product: any, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        "Корзина пуста"
      )}
    </div>
  );
};

export default Cart;
