import React from 'react';

const Input = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label  className="block text-gray-700 text-center font-medium mb-1 text-md" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
  className="shadow border rounded w-full max-w-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto  flex flex-col "
      />
    </div>
  );
};
export default Input;
