import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  blueText: {
    textAlign: "center",
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer",
    marginBottom: 20,
    "& >span": {
      "&:hover": {
        color: "#7676f9",
      },
    },
  },
  checkboxes: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    textAlign: "center",
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
    },
  },
  radio: {
    padding: "3px 9px",
  },
  gameInfo: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  marginRight20: {
    marginRight: 20,
  },
  refresh: {
    marginRight: 20,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  link: {
    textDecoration: "none",
  },
  timer: {
    minWidth: 120,
  },
});

type Props = {
  refresh: (radioValue: string) => void;
};

const StartAgainButton = ({ refresh }: Props) => {
  const classes = useStyles();
  const radioValue: string = useAppSelector((state) => state.minesweeper.radioValue);
  const [startAgain, setStartAgain] = useState(false);

  const clickStartAgain = (): void => {
    setStartAgain(!startAgain);
  };

  useEffect(() => {
    refresh(radioValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAgain]);

  return (
    <span onClick={clickStartAgain} className={classes.refresh}>
      Начать заново
    </span>
  );
}

export default StartAgainButton;
