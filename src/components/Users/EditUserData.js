import React from "react";
import { useForm } from "react-hook-form";
import ReusableInput from "../../common/ReusableInput";
import swal from "sweetalert";
import axios from "axios";

const EditUserData = ({ usersData, setModal, setUsersList }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (apiData) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to update this user?",
      icon: "warning",
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const { data } = await axios.put(
            `https://jsonplaceholder.typicode.com/users/${usersData.id}`,
            { ...apiData }
          );
          if (data) {
            swal("Successful", "Successfully updated the data", "success");
            setUsersList((prev) =>
              prev.map((item) =>
                item.id === usersData.id ? { ...item, ...apiData } : item
              )
            );
            setModal(false);
          }
        } catch (error) {
          //   setError(error?.response && error?.response?.data?.message);
        }
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ReusableInput
        label="Name"
        id="name"
        name="name"
        type="text"
        defaultValue={usersData?.name}
        register={register}
      />
      <ReusableInput
        label="UserName"
        id="username"
        name="username"
        type="text"
        defaultValue={usersData?.username}
        register={register}
      />
      <ReusableInput
        label="email"
        id="email"
        name="email"
        defaultValue={usersData?.email}
        type="text"
        register={register}
      />
      <ReusableInput
        label="Phone"
        id="phone"
        name="phone"
        type="text"
        defaultValue={usersData?.phone}
        register={register}
      />
      <ReusableInput
        label="Website"
        id="website"
        name="website"
        defaultValue={usersData?.website}
        type="text"
        register={register}
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default EditUserData;
