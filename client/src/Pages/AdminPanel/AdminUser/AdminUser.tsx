import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../Components/dataTable/DataTable";
import { userRows } from "../../../data";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import Add from "../../../Components/add/Add";
import AddOrder from "../../../Components/addOrder/AddOrder";

const columns: GridColDef<(typeof userRows)[number]>[] = [
  {
    field: 'id', headerName: 'ID', width: 90
  },
  {
    field: 'img', headerName: 'Image', width: 100,
    renderCell: (params) => {
      return (params?.row.img ? <img className="w-8 h-8 rounded-full object-cover" src={params?.row?.img} alt='' /> : <RxAvatar size={32} className="opacity-50" />)
    }
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    type: 'string',
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    type: 'string',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'string',
    width: 200,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'string',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'CreatedAt',
    width: 200,
    type: 'string',
  },
  {
    field: 'verified',
    headerName: 'Verified',
    type: 'boolean',
    width: 150,
  }
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  // },
];

const initialFormData = [
  { id: 0, headerName: 'First Name', value: '', type: 'text' },
  { id: 1, headerName: 'Last Name', value: '', type: 'text' },
  { id: 2, headerName: 'Email', value: '', type: 'text' },
  { id: 3, headerName: 'Phone', value: '', type: 'text' },
  { id: 4, headerName: 'createdAt', value: '', type: 'text', },
  { id: 5, headerName: 'Verified', value: '', type: 'text' },
];

const AdminUser = () => {

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(userRows);
  const [formField, setFormField] = useState(initialFormData);
  const [isAddEdit, setIsAddEdit] = useState('Add');
  const [editRowId, setEditRowId] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  //   console.log('formField', formField);
  //   if (isAddEdit === 'Add') {
  //     const user = [...users];
  //     const newUser = {
  //       id: Math.floor(Math.random() * 1000),
  //       img: "",
  //       firstName: formField[0]?.value,
  //       lastName: formField[1]?.value,
  //       email: formField[2]?.value,
  //       phone: formField[3]?.value,
  //       createdAt: formField[4]?.value,
  //       verified: formField[5]?.value === 'yes' ? true : false,
  //     };

  //     user.unshift(newUser);
  //     setUsers(user);
  //     setOpen(false);
  //   }
  //   else {
  //     const editUsers = [...users];
  //     const newEditUser = {
  //       id: editRowId,
  //       img: "",
  //       firstName: formField[0]?.value,
  //       lastName: formField[1]?.value,
  //       email: formField[2]?.value,
  //       phone: formField[3]?.value,
  //       createdAt: formField[4]?.value,
  //       verified: formField[5]?.value === 'yes' ? true : false,
  //     };
  //     const findEditedRowIndex = editUsers.findIndex(item => item.id === editRowId);
  //     if (findEditedRowIndex !== -1) {
  //       editUsers.splice(findEditedRowIndex, 1, newEditUser);
  //     }
  //     setUsers(editUsers);
  //     setOpen(false);
  //   }
  //   //add new item
  //   //axios.post(`/api/${slug}s`, {})
  // };

  // const addNewuserButton = () => {
  //   setIsAddEdit('Add');
  //   setFormField(initialFormData);
  //   setOpen(true);
  };

  return (
    <div className="users text-mainBg">
      <div className="info flex items-center gap-5 mb-5 flex-wrap">
        <div className="text-4xl font-bold text-mainBg" >Orders</div>
        {/* <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={addNewuserButton}
        >Add New User</button>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={addNewuserButton}
        >Save Changes</button> */}
      </div>
      <div className="flex flex-col gap-10 flex-wrap">
        <div className="bg-softColor w-[80%] border border-gray-400 flex gap-10 p-5 font-semibold" >
          <div className="w-[25%]" >
            <div>Product Name</div>
            <div>Name</div>
            <div>Address</div>
            <div>city, country, phone</div>
          </div>
          <div className="w-[25%]" >
            <div>items: 1</div>
            <div>Method: COD</div>
            <div>Payment: Pending</div>
            <div>Date: 1/25/2027</div>
          </div>
          <div className="flex flex-col w-[25%]" >
            <div>Total Price: £ 70</div>
          </div>
          <div className="flex flex-col w-[25%]" >
            <select className="w-[10rem] p-1 rounded-sm outline-none border border-gray-400 bg-softColor" >
              <option>Order placed</option>
              <option>Packing</option>
              <option>Shipped</option>
              <option>Out of Delivery</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </div>


      {/* <DataTable
        slug="user"
        columns={columns}
        rows={users}
        setUsers={setUsers}
        setOpen={setOpen}
        setFormField={setFormField}
        formField={formField}
        setIsAddEdit={setIsAddEdit}
        setEditRowId={setEditRowId}
      /> */}

      {open &&
        <AddOrder
          isAddEdit={isAddEdit}
          handleSubmit={handleSubmit}
          slug="orders"
          columns={columns}
          setOpen={setOpen}
        />}
    </div>
  );
};

export default AdminUser;