import { useState } from 'react';
///////////////////////ONSUBMIT ON THE WORKS
/**
 * This component takes in a prop called inputs and formName.
 *  -inputs is an array of an object with two properties:
 *    1) label: the name you want to put for the input.
 *    2) type: the input type you want to use.
 *    - The inputs are created in order of the objects in the array
 *    - Also if there is a password and confirm password inputs they should be next to each other.
 *  -formName is the name of the form you want. Helps create react keys dynamically
 * It will also create the a controlled form for input verification
 * @param props
 * @returns Returns a form with its components
 */
function Form({ inputs, formName }) {
  const numOfInputs = inputs.length;
  const createState = {};
  const onChange = {};
  const [errors, setErrors] = useState({});

  /*Creates state dynamically. Not good practice according to documentation,
  but upon further reading since the size of array never changes it should not
  have changed any side-effects */
  for (let i = 0; i < numOfInputs; i++) {
    /* eslint-disable */
    const [state, setState] = useState({});
    createState[i] = { state, setState };
  }

  //creates onChange methods dynamically
  for (let i = 0; i < numOfInputs; i++) {
    onChange[i] = (e) => {
      const inputTag = e.currentTarget;
      createState[i].setState(inputTag);

      const hasNoErrors = checkInputs(
        inputTag.value,
        inputTag.type,
        errors,
        setErrors,
        i,
        createState
      );
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    for (const key in errors) {
      const error = errors[key];
      if (error.hasError) return console.log('has error');
    }
    console.log('submitted');
    console.log(createState);
  }

  return (
    <form onSubmit={onSubmit}>
      {inputs.map((input, index) => (
        <div key={formName + input.label}>
          <label>{input.label}:</label>
          <input
            type={input.type}
            value={createState[index.state]?.value}
            onChange={onChange[index]}
          />
          {!errors[index]?.hasError ? null : <p>{errors[index].message}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

/**
 * This is a helper function that does all the validation on forms,
 * also will change errors in a specified index if there are any problems
 * @param value: the value of the current input
 * @param type: the input type attribute
 * @param errors: the error object, will add the errors if any persist
 * @param index: the current index or iteration in the array
 * @param stateObj: the obj that holds all the state, used for password verification
 * @param setStateObj: the obj the changes the stateObj using React
 * @returns a boolean value
 */
function checkInputs(value, type, errors, setErrors, index, stateObj) {
  // console.log(stateObj[index - 1].state.type);
  if (stateObj[index - 1]?.state.type === 'password') {
    if (stateObj[index - 1].state.value !== value) {
      setErrors({
        ...errors,
        [index]: {
          hasError: true,
          message: 'Password does not match'
        }
      });
    } else {
      setErrors({
        ...errors,
        [index]: {
          hasError: false,
          value,
          message: ''
        }
      });
      console.log('inside value');
      return false;
    }
  }
  //checks inputs
  // console.log(errors);
  return true;
}

export default Form;
