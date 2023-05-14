import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setChosenProduct } from "../../reducer/reducer";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToCart = (): void => {
    dispatch(setChosenProduct(null));
    navigate("/cart");
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.shoppingCart} onClick={goToCart}>
        Корзина
      </button>
    </div>
  );
};

export default Header;
