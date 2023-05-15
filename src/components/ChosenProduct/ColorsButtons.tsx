import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Color, Product, setNotificationText } from "../../reducer/reducer";
import styles from "./ChosenProduct.module.css";

const ColorsButtons = ({ colors, fakeGetReqProductColor }: any) => {
  const dispatch = useAppDispatch();
  const chosenColor: Color | null = useAppSelector((state) => state.catalog.chosenColor);
  const chosenProduct: Product | null = useAppSelector((state) => state.catalog.chosenProduct);

  const handleChooseColor = (colorID: number): void => {
    if (!chosenProduct) return;

    dispatch(setNotificationText({ isError: false, text: "" }));
    fakeGetReqProductColor(chosenProduct.id, colorID);
  };

  return (
    <p>
      Цвета:{" "}
      {colors.map((color: any, index: number) => (
        <span
          key={index}
          className={`${styles.color} ${
            index + 1 === chosenColor?.id ? styles.active : styles.hover
          }`}
          onClick={() => handleChooseColor(color.id)}
        >
          {color.name}
        </span>
      ))}
    </p>
  );
};

export default ColorsButtons;
