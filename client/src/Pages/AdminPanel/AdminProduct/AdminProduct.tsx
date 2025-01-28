import { useEffect, useState } from "react";
import DataTable from "../../../Components/dataTable/DataTable";
import Add from "../../../Components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../../data";
import { AllProductsGetService, DeleteService, FormPostService } from "../../../global/GeneralService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "imgSrc",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img className="w-10 object-cover" src={params.row.imgSrc || "/noavatar.png"} alt="" />;
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
  const [users, setUsers] = useState([]);
  const [formField, setFormField] = useState(initialFormData);
  const [isAddEdit, setIsAddEdit] = useState('Add');
  const [editRowId, setEditRowId] = useState(0);
  const token = useSelector((state: RootState) => state?.credentialReducer?.userToken);

  const [form, setFormData] = useState({
    title: '',
    desc: '',
    isSpecial: false,
    specialText: 0,
    price: 0,
    categoryValue: '6',
    category: [
      { name: 'Parties Decor', value: '1' },
      { name: 'Home Decor', value: '2' },
      { name: 'Office Stationary', value: '3' },
      { name: 'DIY households', value: '4' },
      { name: 'Art & Craft', value: '5' },
      { name: 'School Stationary', value: '6' },
    ],
    stock: 0,
    bestSeller: false,
    imageFile: '',
    discountedPrice: 0,
    discountPercentage: 0,
  });

  // {
  //     id: '1',
  //     productId: 1,
  //     imgSrc: product1,
  //     specialText: 'Special',
  //     isSpecial: true,
  //     paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
  //     price: '1.12',
  //     Name: 'Pencil',
  //     quantity: 0,
  //     isDiscount: false,
  //     categoryName: 'Pencils',
  //     isBestSelling: false
  // },

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    await AllProductsGetService('/product/get-all')
      .then((response) => {
        console.log(response);
        // setUsers(response?.data?.products);
        const allProducts = response.data?.products.map((item) => ({
          id: item?._id,
          productId: 7,
          imgSrc: item?.images[0]?.url,
          specialText: 0,
          isSpecial: true,
          paragraph: item?.description,
          price: item?.price,
          Name: item?.name,
          quantity: 0,
          isDiscount: false,
          categoryName: 'Brushes',
          stock: item?.stock,
        }));
        setUsers(allProducts);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleAddProduct = () => {

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formField', formField);

    const formData = new FormData();

    formData.append('name', form?.title);
    formData.append('description', form?.desc);
    formData.append('price', String(form?.price));
    formData.append('isSpecial', String(form?.isSpecial));
    formData.append('specialoffer', String(form?.specialText));
    formData.append('discountprice', String(form?.discountedPrice));
    formData.append('discountpercent', String(form?.discountPercentage));
    formData.append('stock', String(form?.stock));
    formData.append('category', form?.categoryValue)
    formData.append('bestSeller', String(form?.bestSeller))
    formData.append('file', form?.imageFile as string | Blob);

    FormPostService('/product/create', formData, token)
      .then((response) => {
        console.log(response);
        setOpen(false);
        getProductList();
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const addNewuserButton = () => {
    setIsAddEdit('Add');
    setFormField(initialFormData);
    setOpen(true);
    setFormData({
      title: '',
      desc: '',
      isSpecial: false,
      specialText: 0,
      price: 0,
      categoryValue: '6',
      category: [
        { name: 'Parties Decor', value: '1' },
        { name: 'Home Decor', value: '2' },
        { name: 'Office Stationary', value: '3' },
        { name: 'DIY households', value: '4' },
        { name: 'Art & Craft', value: '5' },
        { name: 'School Stationary', value: '6' },
      ],
      stock: 0,
      bestSeller: false,
      imageFile: '',
      discountedPrice: 0,
      discountPercentage: 0,
    })
  };

  const handleDelete = (id: string) => {
    DeleteService('/product/delete-product/', id, token)
      .then((response) => {
        console.log(response);
        getProductList();
      })
      .catch((error) => { console.log(error); })
  };

  return (
    <div className="products">
      <div className="info flex items-center gap-5 mb-5">
        <div className="text-4xl font-bold text-mainBg" >Products</div>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={addNewuserButton}
        >Add New Product</button>
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
        handleDelete={handleDelete}
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
          handleAddProduct={handleAddProduct}
        />
      }
    </div>
  );
};

export default AdminProduct;