// import { IoIosNotificationsOutline } from "react-icons/io";
// import { FiGrid } from "react-icons/fi";
// import { CiSearch } from "react-icons/ci";
// import { FaExpand } from "react-icons/fa6";
// import { IoSettingsOutline } from "react-icons/io5";
import logoblack from '../../assets/logoblack.png';
import { FiLogOut } from "react-icons/fi";
import { GetService } from '../../global/GeneralService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setRemoveToken } from '../../redux/credentialReducer';
import { useNavigate } from 'react-router';

const AdminNavbar = () => {
  const token = useSelector((state: RootState) => state.credentialReducer.userToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    GetService('/user/logout', token)
      .then((response) => {
        console.log(response);
        dispatch(setRemoveToken());
        navigate('/Login');
      })
      .catch((error) => {
        console.log(error);
      })
  };
  return (
    <div className="w-full p-5 flex items-center justify-between">
      <div className="logo flex items-center gap-10">
        <img src={logoblack} alt="" className="w-36" />
        <span className='text-mainBg text-3xl font-black'>Admin Panel</span>
      </div>
      <div className="icons flex items-center gap-5">
        <div className="flex gap-5 lg:flex md:flex sm:hidden" >
          {/* <CiSearch size={20} />
          <FiGrid size={20} />
          <FaExpand size={20} /> */}
        </div>
        <div className="notification flex items-center relative">
          {/* <IoIosNotificationsOutline size={24} /> */}
          {/* <span className="flex items-center justify-center bg-red-600 text-white w-4 h-4 rounded-full absolute -top-2 -right-2 text-sm" >1</span> */}
        </div>
        <div className="bg-mainBg user flex gap-3 rounded-full px-2">
          {/* <img
            className="w-[1.63rem] h-[1.63rem] rounded-full object-cover"
            src="https://images.pexels.com/photos/29929142/pexels-photo-29929142/free-photo-of-black-and-white-portrait-of-a-llama.jpeg"
            alt="image"
          /> */}
          <span className='text-softColor text-2xl font-extrabold'>A</span>
        </div>
        {/* <IoSettingsOutline /> */}
        <div><button className="bg-mainBg text-softColor text-sm p-2 rounded-md font-semibold flex items-center gap-1" onClick={handleLogout}><FiLogOut size={20} />Logout</button></div>
      </div>
    </div>
  );
};

export default AdminNavbar;