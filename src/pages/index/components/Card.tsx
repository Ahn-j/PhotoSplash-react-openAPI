import styles from "./Card.module.scss";
import type { CardDTO } from "../types/card";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  data: CardDTO;
  handleDialog: Dispatch<SetStateAction<boolean>>;
  handleSetData: Dispatch<SetStateAction<CardDTO>>;
}

function Card({ data, handleDialog, handleSetData }: Props) {
  const openDialog = () => {
    console.log("open");
    handleDialog(true);
    handleSetData(data);
  };
  return (
    <div className={styles.card} onClick={openDialog}>
      <img
        src={data.urls.small}
        alt={data.alt_description}
        className={styles.card__image}
      />
    </div>
  );
}

export default Card;
