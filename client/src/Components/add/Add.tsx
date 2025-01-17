import { GridColDef } from "@mui/x-data-grid";
import CustomInput from "../Global/CustomInput";
import { useState } from "react";
// import { useState } from "react";

type Props = {
    slug: string,
    columns: GridColDef[],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void,
    isAddEdit: string,
    form: formDataInterface,
    setFormData: React.Dispatch<React.SetStateAction<formDataInterface>>,
};

type formDataInterface = {
    title: string,
    desc: string,
    isSpecial: boolean,
    specialText: string,
    price: string,
    category: Array<Icategory>,
    bestSeller: boolean,
    categoryValue: string,
};

type Icategory = {
    name: string,
    value: string,
}

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

    const handleChange = (field: string, value: string | boolean) => {
        const newFormState = { ...props?.form, [field]: value };
        props?.setFormData(newFormState);
    };

    return (
        <div className="add w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.724)] flex items-center justify-center" >
            <div className="modal p-12 rounded-xl bg-white relative w-[30rem]">
                <span className="close absolute top-3 right-3 cursor-pointer text-mainBg font-extrabold text-xl" onClick={() => props?.setOpen(false)} >X</span>
                <div className="text-3xl font-bold mb-10 text-mainBg" >{props?.isAddEdit} {props?.isAddEdit === 'Add' ? 'New' : ''} {props?.slug}</div>
                <form
                    className=""
                    onSubmit={props?.handleSubmit} >
                    <div className="item flex flex-col gap-3 mb-5">
                        <label className="text-sm font-medium text-mainBg">Title</label>
                        <input
                            className="p-2 bg-transparent outline-none border border-solid border-mainBg rounded-md text-mainBg placeholder-mainBg"
                            placeholder={'Title'}
                            value={props?.form?.title}
                            onChange={(event) => handleChange('title', event.target.value)}
                        />
                        <label className="text-sm font-medium text-mainBg">Description</label>
                        <input
                            className="p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Description'}
                            value={props?.form?.desc}
                            onChange={(event) => handleChange('desc', event.target.value)}
                        />
                        <CustomInput
                            type={'checkbox'}
                            id={'isSpecial'}
                            productLabel={'Add to Special Offer'}
                            textColor={'text-mainBg'}
                            size={"text-base"}
                            checked={props?.form?.isSpecial}
                            onChange={() => handleChange('isSpecial', !props?.form?.isSpecial)}
                        />
                        <input
                            hidden={!props?.form?.isSpecial}
                            className="p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Special offer name'}
                            value={props?.form?.specialText}
                            onChange={(event) => handleChange('specialText', event.target.value)}
                        />
                        <label className="text-sm font-medium text-mainBg">Price</label>
                        <input
                            className="p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            placeholder={'Price'}
                            value={props?.form?.price}
                            onChange={(event) => handleChange('price', event.target.value)}
                        />
                        <label className="text-sm font-medium text-mainBg">Category</label>
                        <select
                            className="p-2 bg-transparent text-mainBg outline-none border border-solid border-mainBg rounded-md placeholder-mainBg"
                            value={props?.form?.categoryValue}
                            onChange={(event) => handleChange('categoryValue', event.target.value)}
                        >
                            {props?.form?.category && props?.form?.category.map((item, index) => (
                                <option key={index} value={item?.value} >{item?.name}</option>
                            ))}
                        </select>
                        <CustomInput
                            type={'checkbox'}
                            id={'bestSeller'}
                            productLabel={'Add to BestSeller'}
                            checked={props?.form?.bestSeller}
                            textColor={'text-mainBg'}
                            size={"text-base"}
                            onChange={() => handleChange('bestSeller', !props?.form?.bestSeller)}
                        />
                    </div>
                    <button className="w-full p-3 cursor-pointer bg-softColor rounded-md text-mainBg font-semibold ">{props?.isAddEdit}</button>
                </form>
            </div>
        </div>
    );
};

export default Add;