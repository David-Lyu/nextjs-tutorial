import { useState } from 'react';

/**
 * This component takes in a prop called inputs and formName.
 *  -inputs is an array of an object with two properties:
 *    1) label: the name you want to put for the input.
 *    2) type: the input type you want to use.
 *  -formName is the name of the form you want. Helps create react keys dynamically
 * It will also create the a controlled form for input verification
 * @param props
 * @returns Returns a form with its components
 */
function Form({ inputs, formName }) {
  const numOfInputs = inputs.length;
  const createState = {};
  const onChange = {};
  const [hasErrors, setHasErrors] = useState({});

  /*Creates state dynamically. Not good practice according to documentation,
  but upon further reading since the size of array never changes it should not
  have changed any side-effects */
  for (let i = 0; i < numOfInputs; i++) {
    /* eslint-disable */
    const [state, setState] = useState('');
    createState[i] = { state, setState };
  }

  //creates onChange methods dynamically
  for (let i = 0; i < numOfInputs; i++) {
    onChange[i] = (e) => {
      const inputTag = e.currentTarget;
      console.log(inputTag.type);
      if (!checkInputs(inputTag.value, inputTag.type));
      createState[i].setState(e.currentTarget.value);
    };
  }

  //error handling
  for (let i = 0; i < numOfInputs; i++) {}

  function onSubmit(e) {
    e.preventDefault();
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
            value={createState[index.state]}
            onChange={onChange[index]}
          />
          <p>Error please use valid inputs</p>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

function checkInputs(value) {
  //checks inputs
  return true;
}

export default Form;
