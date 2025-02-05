import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../Components/dataTable/DataTable";
import { useEffect, useState } from "react";
import AddCategory from "../../../Components/addCategory/AddCategory";
import { AllProductsGetService, DeleteService, FormPostService } from "../../../global/GeneralService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'imgSrc', headerName: 'Image', width: 100,
    renderCell: (params) => {
      return <img className="w-10 object-cover" src={params.row.imgSrc || "/noavatar.png"} alt="" />;
    }
  },
  {
    field: 'category',
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
  const [users, setUsers] = useState([]);
  const [formField, setFormField] = useState(initialFormData);
  const [isAddEdit, setIsAddEdit] = useState('Add');
  const token = useSelector((state: RootState) => state?.credentialReducer?.userToken);

  const [form, setFormData] = useState({
    category: '',
    explorePopular: false,
    imageFile: '',
  });

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    await AllProductsGetService('/cat/get-all')
      .then((response) => {
        console.log(response);
        if (response.data.categories.length > 0) {
          const category = response.data?.categories.map((item) => ({
            category: item?.category,
            id: item?._id,
            imgSrc: item?.images[0]?.url,
          }));
          setUsers(category);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('category', form?.category);
    formData.append('explorePopular', String(form?.explorePopular));
    formData.append('file', form?.imageFile as string | Blob);

    FormPostService('/cat/create', formData, token)
      .then((response) => {
        console.log(response);
        setOpen(false);
        getCategoryList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewuserButton = () => {
    setIsAddEdit('Add');
    setFormField(initialFormData);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    DeleteService('/cat/delete/', id, token)
      .then((response) => {
        console.log(response);
        getCategoryList();
      })
      .catch((error) => { console.log(error); })
  };

  return (
    <div className="users">
      <div className="info flex items-center gap-5 mb-5">
        <div className="text-4xl font-bold text-mainBg" >Categories</div>
        <button
          className="p-2 cursor-pointer bg-mainBg text-softColor font-medium rounded-md"
          onClick={addNewuserButton}
        >
          Add New Category
        </button>
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
        handleDelete={handleDelete}
      />

      {open &&
        <AddCategory
          isAddEdit={isAddEdit}
          handleSubmit={handleSubmit}
          slug="category"
          columns={columns}
          setOpen={setOpen}
          form={form}
          setFormData={setFormData}
        />}
    </div>
  );
};

export default AdminCategory;