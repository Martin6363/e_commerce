import { useEffect, useState } from "react";
import avatar from "../../assets/images/avatar.png";
import { FaPen } from "react-icons/fa";
import { IconButton } from "@mui/material";
import EditNameModal from "../../components/CrudModals/EditNameModal"
import { useAuth, useLogout } from "../../hooks/useAuth";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  useAuth();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  useEffect(() => {
    let userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className="mt-5 flex rounded-lg flex-wrap flex-col justify-center items-center">
        <Breadcrumbs/>
        <div className="flex items-center container mt-10 sm:w-full md:w-2/3  shadow-lg transform duration-200 easy-in-out">
          <div className="flex justify-center px-5 ">
            <img
              className="h-32 w-32 bg-white p-2 rounded-full   "
              src={avatar}
              alt=""
            />
          </div>
          <div className="text-center flex flex-col items-start">
            <div className="flex gap-2">
              <h2 className="text-gray-500 text-3xl font-bold">{user?.name}</h2>
              <IconButton
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                sx={{ fontSize: "18px" }}
                onClick={handleToggleModal}
              >
                <FaPen />
              </IconButton>
            </div>
            <p className="mt-2 text-gray-500 text-sm">{user?.email}</p>
          </div>
          <IconButton onClick={logout} sx={{position: 'absolute', right: 0}}>
            <LuLogOut/>
          </IconButton>
        </div>
        <div className="w-full">
          <hr className="mt-6" />
          <div className="flex">
            <div className="text-center w-1/2 p-4 cursor-pointer">
              <p>
                <span className="font-semibold">Location</span>
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 cursor-pointer">
              <p>
                {" "}
                <span className="font-semibold">My Orders</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <EditNameModal handleClose={handleToggleModal} userName={user?.name} />}
    </>
  );
}
