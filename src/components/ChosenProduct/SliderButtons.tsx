import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setChosenImage } from "../../reducer/reducer";
import { Color } from "../../reducer/reducer";
import styles from "./ChosenProduct.module.css";

const SliderButtons = () => {
  const dispatch = useAppDispatch();
  const chosenColor: Color | null = useAppSelector((state) => state.catalog.chosenColor);
  const chosenImage: number = useAppSelector((state) => state.catalog.chosenImage);

  const nextImage = (chosenImage: number): void => {
    dispatch(setChosenImage(chosenColor?.images[chosenImage + 1] ? chosenImage + 1 : 0));
  };

  const prevImage = (chosenImage: number): void => {
    if (!chosenColor?.images?.length) return;

    dispatch(
      setChosenImage(
        chosenColor?.images[chosenImage - 1] ? chosenImage - 1 : chosenColor?.images?.length - 1
      )
    );
  };

  return (
    <div className={styles.slider}>
      <button onClick={() => prevImage(chosenImage)}>{"<"}</button>
      <button onClick={() => nextImage(chosenImage)}>{">"}</button>
    </div>
  );
};

export default SliderButtons;
