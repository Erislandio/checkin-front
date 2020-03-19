import React from "react";

export const FormDefaultWrapper = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit} className="default-form">{children}</form>;
};

export const InputDefault = ({
  placeholder,
  name,
  type,
  onChange,
  disabled,
  required,
  title
}) => (
  <div className="default-input">
    <label>{title}</label>
    <input
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      disabled={disabled}
      required={required}
    />
  </div>
);

export const ButtonDefault = ({ onClick, title }) => {
  return (
    <div className="default-button">
      <button onClick={onClick}>{title}</button>
    </div>
  );
};
