import { useEffect } from "react";
//redux
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import { setRadioValue } from "../../../reducer/reducer";
//стили
import { useStyles } from "./MenuStyles";
import { Box, Radio, RadioGroup } from "@material-ui/core";
import { FormControl, FormLabel, FormControlLabel } from "@material-ui/core";

type Props = {
  refresh: (radioValue: string) => void;
};

function Settings({ refresh }: Props) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const radioValue: string = useAppSelector((state) => state.minesweeper.radioValue);

  const clickRadio = (e: any): void => {
    dispatch(setRadioValue(e.target.value));
  };

  useEffect(() => {
    refresh(radioValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  return (
    <Box className={classes.checkboxes}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Уровень сложности:</FormLabel>
        <RadioGroup row value={radioValue} onChange={clickRadio}>
          <FormControlLabel
            value={"easy"}
            control={<Radio className={classes.radio} />}
            label="Новичок"
          />
          <FormControlLabel
            value={"medium"}
            control={<Radio className={classes.radio} />}
            label="Любитель"
          />
          <FormControlLabel
            value={"hard"}
            control={<Radio className={classes.radio} />}
            label="Профессионал"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default Settings;
