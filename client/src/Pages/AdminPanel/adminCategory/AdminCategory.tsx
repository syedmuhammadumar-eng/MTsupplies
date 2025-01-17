import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../Components/dataTable/DataTable";
import { userRows } from "../../../data";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import Add from "../../../Components/add/Add";
import AddOrder from "../../../Components/addOrder/AddOrder";
import AddCategory from "../../../Components/addCategory/AddCategory";

const columns: GridColDef<(typeof userRows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img', headerName: 'Image', width: 100,
    renderCell: (params) => {
      return (params?.row.img ? <img className="w-8 h-8 rounded-full object-cover" src={params?.row?.img} alt='' /> : <RxAvatar size={32} className="opacity-50" />)
    }
  },
  {
    field: 'categoryName',
    headerName: 'Category Name',
    type: 'string',
    width: 150,
  },
  {
    field: 'isPopular',
    headerName: 'Popular',
    type: 'boolean',
    width: 200,
  },
];

const initialFormData = [
  { id: 0, headerName: 'First Name', value: '', type: 'text' },
  { id: 1, headerName: 'Last Name', value: '', type: 'text' },
  { id: 2, headerName: 'Email', value: '', type: 'text' },
  { id: 3, headerName: 'Phone', value: '', type: 'text' },
  { id: 4, headerName: 'createdAt', value: '', type: 'text', },
  { id: 5, headerName: 'Verified', value: '', type: 'text' },
];

const AdminCategory = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(userRows);
  const [formField, setFormField] = useState(initialFormData);
  const [isAddEdit, setIsAddEdit] = useState('Add');
  const [editRowId, setEditRowId] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formField', formField);
    if (isAddEdit === 'Add') {
      const user = [...users];
      const newUser = {
        id: user.length,
        img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        categoryName: 'Prime Decor',
        isPopular: false,
      };

      user.unshift(newUser);
      setUsers(user);
      setOpen(false);
    }
    // else {
    //   const editUsers = [...users];
    //   const newEditUser = {
    //     id: editRowId,
    //     img: "",
    //     firstName: formField[0]?.value,
    //     lastName: formField[1]?.value,
    //     email: formField[2]?.value,
    //     phone: formField[3]?.value,
    //     createdAt: formField[4]?.value,
    //     verified: formField[5]?.value === 'yes' ? true : false,
    //   };
    //   const findEditedRowIndex = editUsers.findIndex(item => item.id === editRowId);
    //   if (findEditedRowIndex !== -1) {
    //     editUsers.splice(findEditedRowIndex, 1, newEditUser);
    //   }
    //   setUsers(editUsers);
    //   setOpen(false);
    // }
    //add new item
    //axios.post(`/api/${slug}s`, {})
  };

  const addNewuserButton = () => {
    setIsAddEdit('Add');
    setFormField(initialFormData);
    setOpen(true);
  };

  const saveChanges = () => {
    // API will be integrated.
  };

  return (
    <div className="users">
      <div className="info flex items-center gap-5 mb-5">
        <div className="text-4xl font-bold text-mainBg" >Categories</div>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={addNewuserButton}
        >Add New Category</button>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={saveChanges}
        >Save Changes</button>
      </div>

      <DataTable
        slug="category"
        columns={columns}
        rows={users}
        setUsers={setUsers}
        setOpen={setOpen}
        setFormField={setFormField}
        formField={formField}
        setIsAddEdit={setIsAddEdit}
        setEditRowId={setEditRowId}
      />

      {open &&
        <AddCategory
          isAddEdit={isAddEdit}
          handleSubmit={handleSubmit}
          slug="category"
          columns={columns}
          setOpen={setOpen}
        />}
    </div>
  );
};

export default AdminCategory;