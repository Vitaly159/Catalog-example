import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { setCartProducts } from "../../reducer/reducer";
import { CartProduct } from "../../reducer/reducer";
import styles from "./Card.module.css";

type Props = {
  product: CartProduct;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector((state) => state.catalog.cartProducts);

  const updateData = () => {
    const cartData: CartProduct[] | null = JSON.parse(localStorage.getItem("myProducts")!);
    const fillCart: CartProduct[] = cartData ? cartData : [];
    dispatch(setCartProducts(fillCart));
  };

  const removeProduct = (product: CartProduct) => {
    const update: CartProduct[] = cartProducts.filter(
      (item) => item.productID !== product.productID
    );
    localStorage.setItem("myProducts", JSON.stringify(update));
    updateData();
  };

  return (
    <div className={styles.item}>
      <div className={styles.imageBlock}>
        <img src={product.images[0]} alt="imageItem"/>
      </div>
      <p className={styles.info}>{product.name}</p>
      <p className={styles.info}>Цвет: {product.colorName}</p>
      <p className={styles.info}>
        Размер: {product.size.label}-{product.size.number}
      </p>
      <p className={styles.info}>Цена: {product.price}</p>
      <div className={styles.buttonBlock}>
        <button onClick={() => removeProduct(product)}>Удалить</button>
      </div>
    </div>
  );
};

export default ProductCard;
