import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsPencil } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import swal from "sweetalert";
import ModalComponent from "../common/ModalComponent";
import EditUserData from "../components/Users/EditUserData";

const UsersScreen = () => {
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState();
  const tableHeaders = [
    "ID",
    "Name",
    "Username",
    "Email",
    "Address",
    "Phone",
    "Website",
  ];
  const tableDataKeys = [
    "id",
    "name",
    "username",
    "email",
    "address",
    "phone",
    "website",
  ];

  const getAllUsersFromApi = async () => {
    setUsersList([]);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (data.length) {
        setUsersList(data);
      }
    } catch (error) {
      setError(error?.response && error?.response?.data?.message);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const { data } = await axios.delete(
            `https://jsonplaceholder.typicode.com/users/${user.id}`
          );
          if (data) {
            setUsersList(usersList.filter((item) => item.id !== user.id));
            swal("Successful", "Successfully deleted the data", "success");
          }
        } catch (error) {
          setError(error?.response && error?.response?.data?.message);
        }
      }
    });
  };

  useEffect(() => {
    getAllUsersFromApi();
  }, []);

  return (
    <div>
      <h3 className="text-center text-lg font-bold">Users List</h3>
      {usersList?.length && (
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              {tableHeaders?.map((item) => (
                <th rowSpan={2} className="p-2 m-2">
                  {item}
                </th>
              ))}
              <th colSpan={2} className="p-2 m-2">
                Action
              </th>
            </tr>
            <tr>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((user) => (
              <tr className="border-b dark:border-neutral-500">
                {tableDataKeys?.map((row) => (
                  <td className="p-2 m-2 whitespace-nowrap px-6 py-4">
                    {JSON.stringify(
                      row === "address" ? user[row]?.city : user[row]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    className="p-2 bg-green-600 text-white"
                    onClick={(e) => handleUpdate(user)}
                  >
                    <BsPencil />
                  </button>
                </td>
                <td>
                  <button
                    className="p-2 bg-red-600 text-white"
                    onClick={(e) => handleDelete(user)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalComponent modalIsOpen={isModalOpen}>
        <EditUserData
          usersData={selectedUser}
          setModal={setIsModalOpen}
          setUsersList={setUsersList}
        />
      </ModalComponent>
    </div>
  );
};

export default UsersScreen;
