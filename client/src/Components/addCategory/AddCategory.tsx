import CustomInput from '../Global/CustomInput';

type Props = {
    slug: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void,
    isAddEdit: string,
    form: formDataInterface,
    setFormData: React.Dispatch<React.SetStateAction<formDataInterface>>,
    handleAddProduct(): void
};

type formDataInterface = {
    categoryName: string,
    explorePopular: boolean,
};

type Icategory = {
    name: string,
    value: string,
};


const AddCategory = (props) => {
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
                        <label className="text-base font-medium text-mainBg">Category Name</label>
                        <input
                            className="text-sm p-2 bg-transparent outline-none border border-solid border-mainBg rounded-md text-mainBg placeholder-mainBg"
                            placeholder={'Category Name'}
                            value={props?.form?.category}
                            onChange={(event) => handleChange('category', event.target.value)}
                        />
                        <CustomInput
                            type={'checkbox'}
                            id={'explorePopular'}
                            productLabel={'Add to Popular Category'}
                            checked={props?.form?.explorePopular}
                            textColor={'text-mainBg'}
                            size={"text-sm"}
                            onChange={() => handleChange('explorePopular', !props?.form?.explorePopular)}
                        />
                    </div>
                    <button className="mt-4 w-full p-3 cursor-pointer bg-softColor rounded-md text-mainBg font-semibold ">{props?.isAddEdit}</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory