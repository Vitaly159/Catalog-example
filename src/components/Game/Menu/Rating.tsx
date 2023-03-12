import { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./MenuStyles";
import { Button } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

const Rating = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <span onClick={handleClickOpen}>Рейтинг</span>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Внимание! Игра обнулится, продолжить?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Link to="/records" className={classes.link}>
            <Button onClick={handleClose} color="primary">
              Продолжить
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Rating;
