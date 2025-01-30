import { GridColDef } from "@mui/x-data-grid";
import CustomInput from "../Global/CustomInput";
import { useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';

type Props = {
    slug: string,
    columns: GridColDef[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void,
    isAddEdit: string,
    form: formDataInterface,
    setFormData: React.Dispatch<React.SetStateAction<formDataInterface>>,
    handleAddProduct(): void
};

type formDataInterface = {
    title: string,
    desc: string,
    isSpecial: boolean,
    specialText: number,
    price: number,
    category: Array<Icategory>,
    bestSeller: boolean,
    categoryValue: string,
    imageFile: any,
    stock: number,
    discountedPrice: number,
    discountPercentage: number,
    categoryName: string,
    subCategory: string,
};

type Icategory = {
    name: string,
    value: string,
};

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



const Add = (props: Props) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (field: string, value: string | boolean, event?: React.ChangeEvent<HTMLSelectElement>) => {
        let text = '';
        let newFormState = { ...props?.form, [field]: value };
        if (event !== undefined) {
            text = event.target.options[event.target.options.selectedIndex].text;
        }
        if (field === 'categoryValue') {
            newFormState = { ...props?.form, [field]: value as string, ['categoryName']: text };
        }
        props?.setFormData(newFormState);
    };

    const handleImageFileChange = (event) => {
        const selectedFile = event.target.files?.[0];
        console.log(selectedFile);

        if (selectedFile) {
            props?.setFormData((prev) => ({
                ...prev,
                imageFile: selectedFile,
            }));
        }
    };

    const handleRemoveImage = () => {
        props?.setFormData((prev) => ({
            ...prev,
            imageFile: { name: '' },
        }));
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleBlur = (value: string) => {
        const specialPrice = parseFloat(value);
        const originalPrice = props?.form?.price;
        let discountPrice = 0;
        let discountPercent = 0;

        if (specialPrice && originalPrice) {
            const discount = originalPrice - specialPrice;
            const percentage = (discount / originalPrice) * 100;

            discountPrice = discount > 0 ? discount : 0;
            discountPercent = percentage > 0 ? percentage : 0;
        } else {
            discountPrice = 0;
            discountPercent = 0;
        }
        const newFormState = { ...props?.form, discountedPrice: discountPrice, discountPercentage: discountPercent, specialText: Number(value) };
        props?.setFormData(newFormState);
    };

    return (
        <div className="add w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.724)] flex items-center justify-center" >
            <div className="modal p-12 rounded-xl bg-white relative w-[30rem]">
                <span className="close absolute top-3 right-3 cursor-pointer text-mainBg font-extrabold text-xl" onClick={() => props?.setOpen(false)} >X</span>
                <div className="text-3xl font-bold text-mainBg" >{props?.isAddEdit} {props?.isAddEdit === 'Add' ? 'New' : ''} {props?.slug}</div>

                <form
                    className=""
                    onSubmit={props?.handleSubmit} >
                    <div className="item flex flex-col gap-3 mb-5">
                        <label className="text-sm font-medium text-mainBg">Title</label>
                        <input
                            className="text-sm p-2 bg-transparent outline-none border border-solid border-mainBg rounded-md text-mainBg placeholder-mainBg"
                            placeholder={'Title'}
                            value={props?.form?.title}
                            onChange={(event) => handleChange('title', event.target.value)}
                        />
                        <label className="text-sm font-medium text-mainBg">Description</label>
                        <input
                            className="text-sm p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Description'}
                            value={props?.form?.desc}
                            onChange={(event) => handleChange('desc', event.target.value)}
                        />
                        <label className="text-sm font-medium text-mainBg">Price</label>
                        <input
                            className="text-sm p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Price'}
                            type="number"
                            value={props?.form?.price}
                            onChange={(event) => handleChange('price', event.target.value)}
                        />
                        <CustomInput
                            type={'checkbox'}
                            id={'isSpecial'}
                            productLabel={'Add Special Offer'}
                            textColor={'text-mainBg'}
                            size={"text-sm"}
                            checked={props?.form?.isSpecial}
                            onChange={() => handleChange('isSpecial', !props?.form?.isSpecial)}
                        />
                        <input
                            hidden={!props?.form?.isSpecial}
                            className="text-sm p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Special offer price'}
                            type={'number'}
                            value={props?.form?.specialText}
                            onChange={(event) => handleChange('specialText', event.target.value)}
                            onBlur={(event) => handleBlur(event.target.value)}
                        />
                        {props?.form?.isSpecial && props?.form?.discountedPrice !== null && props?.form?.discountPercentage !== null && (
                            <div className="text-xs font-semibold text-green-500">
                                Discount: £ {props?.form?.discountedPrice.toFixed(2)} (
                                {props?.form?.discountPercentage.toFixed(2)}%) <span><Tooltip title="Add Special price and focus out to update discount."><ErrorOutlineIcon className="text-gray-900" sx={{ fontSize: 14 }} /></Tooltip></span>
                            </div>
                        )}
                        <label className="text-sm text-mainBg">Stock</label>
                        <input
                            className="text-sm p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Stock'}
                            type="number"
                            value={props?.form?.stock}
                            onChange={(event) => handleChange('stock', event.target.value)}
                        />
                        <label className="text-sm font-medium text-mainBg">Category</label>
                        <select
                            className="text-sm p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            value={props?.form?.categoryValue}
                            onChange={(event) => handleChange('categoryValue', event.target.value, event)}
                        >
                            {props?.form?.category && props?.form?.category.map((item, index) => (
                                <option key={index} value={item?.value} >{item?.name}</option>
                            ))}
                        </select>
                        <label className="text-sm text-mainBg">Sub Category <span><Tooltip title="Ensure that products of the same type retain the same sub-category."><ErrorOutlineIcon className="text-gray-900" sx={{ fontSize: 14 }} /></Tooltip></span></label>
                        <input
                            className="text-sm p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Sub Category'}
                            type="text"
                            value={props?.form?.subCategory}
                            onChange={(event) => handleChange('subCategory', event.target.value)}
                        />
                        <CustomInput
                            type={'checkbox'}
                            id={'bestSeller'}
                            productLabel={'Add to BestSeller'}
                            checked={props?.form?.bestSeller}
                            textColor={'text-mainBg'}
                            size={"text-sm"}
                            onChange={() => handleChange('bestSeller', !props?.form?.bestSeller)}
                        />
                    </div>
                    <div className="text-black" >
                        <input
                            id={"image-upload"}
                            type={"file"}
                            className="hidden"
                            ref={inputRef}
                            onChange={(event) => handleImageFileChange(event)}
                        // disabled={isEditMode}
                        />
                        {/* ${isEditMode ? "cursor-not-allowed" : ""} */}
                        {!props?.form?.imageFile?.name ? (
                            <label
                                htmlFor="image-upload"
                                className={`flex flex-col items-center justify-center h-32 cursor-pointer`}
                            >
                                <IoCloudUploadOutline className="w-10 h-10 text-muted-foreground mb-2" />
                                <span className="text-sm" >Upload image</span>
                            </label>
                        ) : (
                            <div className="flex justify-center items-center gap-8 mb-5" >
                                <div><CiFileOn size={24} /></div>
                                <div><p className="font-medium" >{props?.form?.imageFile?.name}</p></div>
                                <div><span className="cursor-pointer text-mainBg font-extrabold text-lg" onClick={() => handleRemoveImage()} >X</span></div>
                            </div>
                        )}
                    </div>
                    <button className="w-full p-3 cursor-pointer bg-softColor rounded-md text-mainBg font-semibold " onClick={props?.handleAddProduct}>{props?.isAddEdit}</button>
                </form>
            </div>
        </div>
    );
};

export default Add;