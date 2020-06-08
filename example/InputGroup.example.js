import React from 'react';

function InputGroup({
  label,
  disabled=false,
  placeholder,
  feedback,
}) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type="text"
        className="form-control"
        disabled={disabled}
        placeholder={placeholder}
      />
      {feedback}
    </div>
  )
}

export const InputGroupConfig = {
  component: InputGroup,
  description: "This is an example of InputGroup using Bootstrap styling",
  props: [
    {
      name: "label",
      value: "Label",
      required: true,
      type: "string",
      doc: "The label of the InputGroup"
    },
    {
      name: "disabled",
      value: false,
      type: "boolean",
      doc: "Whether of not the input field is disabled"
    },
    {
      name: "placeholder",
      value: "",
      type: "string",
      doc: "The placeholder of the input field"
    },
    {
      name: "feedback",
      value: "",
      type: "string",
      doc: "The feedback of the input"
    }
  ]
};

export default InputGroup;