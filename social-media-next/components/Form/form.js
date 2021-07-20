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
      checkInputs(inputTag, i);
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    for (const key in errors) {
      const error = errors[key];
      //might move this into a helper function below do b/c it is done multiple times
      if (error.hasError) {
        setErrors({
          ...errors,
          [props.formName]: {
            hasError: true,
            message: 'Not submitted please clear errors'
          }
        });
        return console.log('has error');
      }
    }
    if (!props.formName.hasError) {
      setErrors({
        ...errors,
        [props.formName]: {
          hasError: false,
          message: ''
        }
      });
    }
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

  //helper function to check inputs
  function checkInputs(inputTag, index) {
    // console.log(stateObj[index - 1].state.type);
    //checks inputs
    switch (inputTag.type) {
      default:
      case 'password':
        checkPasswords(
          inputTag.value,
          inputTag.type,
          errors,
          setErrors,
          index,
          createState
        );
        break;
      case 'email':
        break;
      case 'tel':
        break;
    }
  }
}

// small bug if user puts confirm password first then password will cause error still
function checkPasswords(value, type, errors, setErrors, index, stateObj) {
  if (stateObj[index - 1]?.state.type === 'password') {
    if (stateObj[index - 1].state.value === value || value.length === 0) {
      setErrors({
        ...errors,
        [index]: {
          hasError: false,
          value,
          message: ''
        }
      });
      return true;
    }

    if (stateObj[index - 1].state.value !== value) {
      setErrors({
        ...errors,
        [index]: {
          hasError: true,
          message: 'Password does not match'
        }
      });
      return false;
    }
  }
}

export default Form;
