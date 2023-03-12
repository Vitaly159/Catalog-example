import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
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
