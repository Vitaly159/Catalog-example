import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    flexGrow: 1,
    padding: 10,
  },
  table: {
    display: "inline",
    borderCollapse: "collapse",
  },
  tableBox: {
    display: "flex",
    justifyContent: "center",
  },
  cell: {
    border: "1px black solid",
    textAlign: "center",
    background: "rgb(220,220,220)",
    fontWeight: 600,
  },
  closed: {
    cursor: "pointer",
    boxShadow: "2px 2px rgb(180,180,180)",
    "&:hover": {
      background: "rgb(240,240,240)",
    },
    "&:active": {
      background: "rgb(170,170,170)",
    },
  },
  opened: {
    background: "white",
  },
  image: {
    width: "80%",
    height: "80%",
    objectFit: "contain",
  },
  lightBlue: {
    color: "#6abafc",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  hardBlue: {
    color: "#0128f6",
  },
  brown: {
    color: "brown",
  },
  turquoise: {
    color: "#30d5c8",
  },
  black: {
    color: "black",
  },
  pink: {
    color: "pink",
  },
  easy: {
    width: "calc(2vh + 2vw)",
    height: "calc(2vh + 2vw)",
    fontSize: "calc(1.2vh + 1.2vw)",
  },
  medium: {
    width: "calc(1.2vh + 1.2vw)",
    height: "calc(1.2vh + 1.2vw)",
    fontSize: "calc(1vh + 1vw)",
  },
  hard: {
    width: "calc(0.8vh + 1vw)",
    height: "calc(0.8vh + 1vw)",
    fontSize: "calc(0.5vh + 0.6vw)",
  },
});
