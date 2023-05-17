import React from "react";

const ReusableInput = ({
  type = "",
  label = "",
  id = "",
  name = "",
  register,
  defaultValue = "",
}) => {
  return (
    <>
      <label className="block text-gray-700 text-sm font-bold mb-2" for={name}>
        {label}{" "}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        id={id}
        name={name}
        defaultValue={defaultValue}
        {...register(name, { required: true })}
      />
      <br />
      <br />
    </>
  );
};

export default ReusableInput;
