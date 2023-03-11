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
    border: "0.5px grey solid",
    textAlign: "center",
    background: "rgb(220,220,220)",
    fontWeight: 600,
    margin: "-2px 0 0 -2px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closed: {
    cursor: "pointer",
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
    width: "calc(3.5vh + 3.5vw)",
    height: "calc(3.5vh + 3.5vw)",
    fontSize: "calc(10px + (1vh + 1vw))",
    maxWidth: "calc(50px - 0.5vw)",
    maxHeight: "calc(50px - 0.5vw)",
    boxSizing: "border-box",
  },
  medium: {
    width: "calc(1.8vh + 1.8vw)",
    height: "calc(1.8vh + 1.8vw)",
    maxWidth: "calc(40px - 0.5vw)",
    maxHeight: "calc(40px - 0.5vw)",
    fontSize: "calc(1vh + 1vw)",
  },
  hard: {
    width: "calc(0.8vh + 1vw)",
    height: "calc(0.8vh + 1vw)",
    fontSize: "calc(0.5vh + 0.6vw)",
  },
});
