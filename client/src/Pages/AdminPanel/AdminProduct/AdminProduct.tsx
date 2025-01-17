import { useState } from "react";
import DataTable from "../../../Components/dataTable/DataTable";
import Add from "../../../Components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "imgSrc",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.imgSrc || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "Name",
    type: "string",
    headerName: "Title",
    width: 200,
  },
  {
    field: "paragraph",
    type: "string",
    headerName: "Description",
    width: 400,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 150,
  },
  {
    field: "isSpecial",
    headerName: "Special Offer",
    type: "boolean",
    width: 200,
  },
  {
    field: "categoryName",
    headerName: "Category",
    width: 200,
    type: "string",
  },
  {
    field: "isDiscount",
    headerName: "Discount",
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

  const [form, setFormData] = useState({
    title: '',
    desc: '',
    isSpecial: false,
    specialText: '',
    price: '',
    categoryValue: '6',
    category: [
      { name: 'Parties Decor', value: '1' },
      { name: 'Home Decor', value: '2' },
      { name: 'Office Stationary', value: '3' },
      { name: 'DIY households', value: '4' },
      { name: 'Art & Craft', value: '5' },
      { name: 'School Stationary', value: '6' },
    ],
    bestSeller: false,
  });



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formField', formField);
    if (isAddEdit === 'Add') {
      const user = [...users];
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        productId: Number(form?.categoryValue),
        imgSrc: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
        specialText: form?.specialText,
        isSpecial: form?.isSpecial,
        paragraph: form?.desc,
        price: form?.price,
        Name: form?.title,
        quantity: 0,
        isDiscount: false,
        categoryName: form?.category[5].name
      };

      user.unshift(newUser);
      setUsers(user);
      setOpen(false);
    }
    else {
      // const editUsers = [...users];
      // const newEditUser = {
      //   id: editRowId,
      //   imgSrc: "",
      //   title: formField[0]?.value,
      //   color: formField[1]?.value,
      //   producer: formField[2]?.value,
      //   price: formField[3]?.value,
      //   createdAt: formField[4]?.value,
      //   inStock: formField[5]?.value === 'yes' ? true : false,
      // };
      // const findEditedRowIndex = editUsers.findIndex(item => item.id === editRowId);
      // if (findEditedRowIndex !== -1) {
      //   editUsers.splice(findEditedRowIndex, 1, newEditUser);
      // }
      // setUsers(editUsers);
      // setOpen(false);
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

  const saveChanges = () => {
    //API will be integrated.
  };

  return (
    <div className="products">
      <div className="info flex items-center gap-5 mb-5">
        <div className="text-4xl font-bold text-mainBg" >Products</div>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={addNewuserButton}
        >Add New Product</button>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={saveChanges}
        >Save Changes</button>
      </div>
      <DataTable
        slug="product"
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
        <Add
          isAddEdit={isAddEdit}
          handleSubmit={handleSubmit}
          slug="product"
          columns={columns}
          setOpen={setOpen}
          form={form}
          setFormData={setFormData}
        />
      }
    </div>
  );
};

export default AdminProduct;