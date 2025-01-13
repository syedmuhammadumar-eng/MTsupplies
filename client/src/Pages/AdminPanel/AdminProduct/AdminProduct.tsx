import { useState } from "react";
import DataTable from "../../../Components/dataTable/DataTable";
import Add from "../../../Components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const initialFormData = [
  { id: 0, headerName: 'Title', value: '', type: 'text' },
  { id: 1, headerName: 'Color', value: '', type: 'text' },
  { id: 2, headerName: 'Producer', value: '', type: 'text' },
  { id: 3, headerName: 'Price', value: '', type: 'text' },
  { id: 4, headerName: 'CreatedAt', value: '', type: 'text', },
  { id: 5, headerName: 'InStock', value: '', type: 'text' },
];

const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(products);
  const [formField, setFormField] = useState(initialFormData);
  const [isAddEdit, setIsAddEdit] = useState('Add');
  const [editRowId, setEditRowId] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formField', formField);
    if (isAddEdit === 'Add') {
      const user = [...users];
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        img: "",
        title: formField[0]?.value,
        color: formField[1]?.value,
        producer: formField[2]?.value,
        price: formField[3]?.value,
        createdAt: formField[4]?.value,
        inStock: formField[5]?.value === 'yes' ? true : false,
      };

      user.unshift(newUser)
      setUsers(user);
      setOpen(false);
    }
    else {
      const editUsers = [...users];
      const newEditUser = {
        id: editRowId,
        img: "",
        title: formField[0]?.value,
        color: formField[1]?.value,
        producer: formField[2]?.value,
        price: formField[3]?.value,
        createdAt: formField[4]?.value,
        inStock: formField[5]?.value === 'yes' ? true : false,
      };
      const findEditedRowIndex = editUsers.findIndex(item => item.id === editRowId);
      if (findEditedRowIndex !== -1) {
        editUsers.splice(findEditedRowIndex, 1, newEditUser);
      }
      setUsers(editUsers);
      setOpen(false);
    }
    //add new item
    //axios.post(`/api/${slug}s`, {})
  };


  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  const addNewuserButton = () => {
    setIsAddEdit('Add');
    setFormField(initialFormData);
    setOpen(true);
  };


  return (
    <div className="products">
      <div className="info flex items-center gap-5 mb-5">
        <div className="text-4xl font-bold" >Products</div>
        <button
          className="p-2 cursor-pointer bg-softColor text-mainBg font-medium rounded-md"
          onClick={addNewuserButton}
        >Add New Products</button>
      </div>
      <DataTable
        slug="product"
        columns={columns}
        rows={products}
        setUsers={setUsers}
        setOpen={setOpen}
        setFormField={setFormField}
        setIsAddEdit={setIsAddEdit}
        setEditRowId={setEditRowId}
      />
      {open &&
        <Add
          isAddEdit={isAddEdit}
          handleSubmit={handleSubmit}
          setFormField={setFormField}
          formField={formField}
          slug="product"
          columns={columns}
          setOpen={setOpen}
        />
      }
    </div>
  );
};

export default AdminProduct;