import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setNotificationText, setChosenSize } from "../../reducer/reducer";
import { Product, Size } from "../../reducer/reducer";
import { getSize } from "../fakeApi/api";
import styles from "./ChosenProduct.module.css";

type Props = {
  sizes: Size[];
  activeSizes: number[];
  chosenSize: Size | null;
};

const SizesButtons = ({ sizes, activeSizes, chosenSize }: Props) => {
  const dispatch = useAppDispatch();
  const chosenProduct: Product | null = useAppSelector((state) => state.catalog.chosenProduct);

  const fakeGetReqSize = async (id: number): Promise<void> => {
    const data = await getSize(id);
    dispatch(setChosenSize(data));
  };

  const handleChooseSize = async (sizeID: number): Promise<void> => {
    if (!chosenProduct) return;

    dispatch(setNotificationText({ isError: false, text: "" }));
    fakeGetReqSize(sizeID);
  };

  return (
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
  );
};

export default SizesButtons;
