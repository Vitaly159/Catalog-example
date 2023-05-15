import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router";
import { setChosenProduct } from "../../reducer/reducer";
import { CartProduct } from "../../reducer/reducer";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.catalog.cartProducts);
  const [amountProductInCart, setAmountProductInCart] = useState<number>();

  useEffect(() => {
    const cartData: CartProduct[] | null = JSON.parse(localStorage.getItem("myProducts")!);
    const fillCart: number = cartData?.length ? cartData.length : 0;

    setAmountProductInCart(fillCart);
  }, [cartProducts]);

  const goToCart = (): void => {
    dispatch(setChosenProduct(null));
    navigate("/cart");
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.shoppingCart} onClick={goToCart}>
        {`Корзина: ${amountProductInCart} товаров`}
      </button>
    </div>
  );
};

export default Header;
