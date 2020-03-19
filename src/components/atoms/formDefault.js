import React from "react";

export const FormDefaultWrapper = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className="default-form">
      {children}
    </form>
  );
};

export const InputDefault = ({
  placeholder,
  name,
  type,
  onChange,
  disabled,
  required,
  title,
  value
}) => (
  <div className="default-input">
    <label>{title}</label>
    <input
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      disabled={disabled}
      required={required}
    />
  </div>
);

export const ButtonDefault = ({
  isLoading,
  disabled,
  onClick,
  title,
  type
}) => {
  return (
    <div className="default-button">
      <button type={type} onClick={onClick} disabled={disabled}>
        {isLoading ? "..." : title}
      </button>
    </div>
  );
};
