/**
 * ************************************
 *
 * @module  TextBox.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */
import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import { NumericFormat } from "react-number-format";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function TextBox(props) {
  const [values, setValues] = React.useState({
    textmask: "(816) 555-1234",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      {props.isNumber ? (
        <FormControl variant="standard">
          <InputLabel htmlFor="formatted-text-mask-input">
            {props.label}
          </InputLabel>
          <Input
            value={values.textmask}
            onChange={handleChange}
            name="textmask"
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
        </FormControl>
      ) : (
        <TextField
          label={props.label}
          // value={values.textformat}
          type={props.type ? props.type : "text"}
          name="textformat"
          placeholder={props.placeholder}
        />
      )}
    </Box>
  );
}

// const TextBox = (props) => {
//   const [values, setValues] = React.useState({
//     textmask: "(100) 000-0000",
//     numberformat: "1320",
//   });
//   const handleChange = (event) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value,
//     });
//   };
//   return (
//     <Box
//       className="user_entry_field"
//       aria-label={props.label ? props.label : ""}
//       aria-hidden={props.label ? "false" : "true"}
//     >
//       <label className={props.labelClass}>{props.label}</label>
//       <TextField
//         className={props.textClass}
//         type="text"
//         placeholder={props.placeholder}
//       />
//       {/* <MyFormHelperText /> */}
//     </Box>
//   );
// };

// export default TextBox;
