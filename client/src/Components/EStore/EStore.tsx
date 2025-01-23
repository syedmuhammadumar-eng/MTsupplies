
import Search from '../../assets/Search.svg';
import CustomInput from '../Global/CustomInput';
import WishlistHeart from '../../assets/icons/WishlistHeart.png';
import Whitebluebordercart from '../../assets/icons/whitebluebordercart.png';
import {
    Brush1,
    Brush2,
    Brush3,
    Brush4,
    Brush5,
    product1,
    product2,
    product3,
    product4,
    product5,
}
    from '../../assets/index';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearSearchedProduct, Product as ProductInterface, setBreadCrumb, setProductDetail } from '../../redux/mtSupplies';
import BreadCrumb from '../Global/BreadCrumb';
import { motion } from 'framer-motion';
import { Button } from '@material-tailwind/react';
import Slider from '@mui/material/Slider';
import { RootState } from '../../store';
interface categoryList {
    id: number,
    productLabel: string,
    isChecked: boolean
}

type categoryDataProps = {
    id: number,
    categoryLabel: string;
    categoryContent: Array<categoryList>;
};

const categoryInitialData: categoryDataProps[] = [
    {
        id: 1,
        categoryLabel: 'Parties Decor',
        categoryContent: [
            { id: 1, productLabel: 'Pencil', isChecked: false },
            { id: 2, productLabel: 'Pen', isChecked: false },
            { id: 3, productLabel: 'Brush', isChecked: false },
        ],
    },
    {
        id: 2,
        categoryLabel: 'Home Decor',
        categoryContent: [
            { id: 4, productLabel: 'Pencil', isChecked: false },
            { id: 5, productLabel: 'Pen', isChecked: false },
            { id: 6, productLabel: 'Brush', isChecked: false },
        ],
    },
    {
        id: 3,
        categoryLabel: 'Office Stationary',
        categoryContent: [
            { id: 7, productLabel: 'Pencil', isChecked: false },
            { id: 8, productLabel: 'Pen', isChecked: false },
            { id: 9, productLabel: 'Brush', isChecked: false },
        ],
    },
    {
        id: 4,
        categoryLabel: 'DIY households',
        categoryContent: [
            { id: 10, productLabel: 'Pencil', isChecked: false },
            { id: 11, productLabel: 'Pen', isChecked: false },
            { id: 12, productLabel: 'Brush', isChecked: false },
        ],
    },
    {
        id: 5,
        categoryLabel: 'Art & Craft',
        categoryContent: [
            { id: 13, productLabel: 'Pencil', isChecked: false },
            { id: 14, productLabel: 'Pen', isChecked: false },
            { id: 15, productLabel: 'Brush', isChecked: false },
        ],
    },
    {
        id: 5,
        categoryLabel: 'School Stationary',
        categoryContent: [
            { id: 16, productLabel: 'Pencil', isChecked: false },
            { id: 17, productLabel: 'Pen', isChecked: false },
            { id: 18, productLabel: 'Brush', isChecked: false },
        ],
    },
];

const initialData: ProductInterface[] = [
    {
        id: '1',
        productId: 1,
        imgSrc: product1,
        specialText: 'Special',
        isSpecial: true,
        paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
        price: '1.12',
        Name: 'Pencil',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pencils',
        isBestSelling: false
    },
    {
        id: '2',
        productId: 2,
        imgSrc: product2,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Pen, its specifications and all other details of it',
        price: '2.14',
        Name: 'Pen',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pens',
        isBestSelling: false
    },
    {
        id: '3',
        imgSrc: product3,
        productId: 2,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Pen, its specifications and all other details of it',
        price: '3.16',
        Name: 'Pen',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pens',
        isBestSelling: false
    },
    {
        id: '4',
        productId: 2,
        imgSrc: product4,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Pen, its specifications and all other details of it',
        price: '4.22',
        Name: 'Pen',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pens',
        isBestSelling: false
    },
    {
        id: '5',
        productId: 1,
        imgSrc: product5,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
        price: '5.24',
        Name: 'Pencil',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pencils',
        isBestSelling: false
    },
    {
        id: '6',
        productId: 1,
        imgSrc: product1,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
        price: '6.26',
        Name: 'Pencil',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pencils',
        isBestSelling: false
    },
    {
        id: '7',
        productId: 2,
        imgSrc: product2,
        specialText: 'Special',
        isSpecial: true,
        paragraph: 'Brand Name - Pen, its specifications and all other details of it',
        price: '7.32',
        Name: 'Pen',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Pens',
        isBestSelling: false
    },
    {
        id: '8',
        productId: 3,
        imgSrc: Brush1,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Brush, its specifications and all other details of it',
        price: '8.34',
        Name: 'Brush',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Brushes',
        isBestSelling: false
    },
    {
        id: '9',
        imgSrc: Brush2,
        productId: 3,
        specialText: '',
        isSpecial: false,
        paragraph: 'Brand Name - Brush, its specifications and all other details of it',
        price: '9.36',
        Name: 'Brush',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Brushes',
        isBestSelling: false
    },
    {
        id: '10',
        productId: 3,
        imgSrc: Brush3,
        specialText: 'Special',
        isSpecial: true,
        paragraph: 'Brand Name - Brush, its specifications and all other details of it',
        price: '10.42',
        Name: 'Brush',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Brushes',
        isBestSelling: false
    },
    {
        id: '11',
        productId: 3,
        imgSrc: Brush4,
        specialText: 'Special',
        isSpecial: true,
        paragraph: 'Brand Name - Brush, its specifications and all other details of it',
        price: '11.44',
        Name: 'Brush',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Brushes',
        isBestSelling: false
    },
    {
        id: '12',
        productId: 7,
        imgSrc: Brush5,
        specialText: 'Special',
        isSpecial: true,
        paragraph: 'Brand Name - Brush, its specifications and all other details of it',
        price: '12.46',
        Name: 'Brush',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Brushes',
        isBestSelling: false
    },
    {
        id: '13',
        imgSrc: Brush4,
        productId: 3,
        specialText: 'Special',
        isSpecial: true,
        paragraph: 'Brand Name - Brush, its specifications and all other details of it',
        price: '13.52',
        Name: 'Brush',
        quantity: 0,
        isDiscount: false,
        categoryName: 'Brushes',
        isBestSelling: false
    },
];

const Product = () => {
    const [value, setValue] = useState<number[]>([1, 20]);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [globalData, setData] = useState<ProductInterface[]>(initialData);
    const [category, setCategory] = useState(categoryInitialData);
    const searchedProduct = useSelector((state: RootState) => state.mtSupplies.searchedProduct);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (searchedProduct.length > 0) {
            const filterGrid = initialData.filter(item => item.categoryName.toLowerCase() === searchedProduct[0].categoryName.toLowerCase());
            setData(filterGrid);
        }
    }, [searchedProduct]);

    const handleClick = (item: any) => {
        const counterCartState = {
            id: item?.id,
            imgSrc: item?.imgSrc,
            specialText: item?.specialText,
            isSpecial: item?.isSpecial,
            paragraph: item?.paragraph,
            price: item?.price,
            quantity: 1,
            Name: item?.name,
            categoryName: item?.categoryName,
            isDiscount: item?.isDiscount,
            productId: item?.productId,
        };
        dispatch(setProductDetail(counterCartState));
        const breadArray = ['Shop', 'ProductDetail'];
        dispatch(setBreadCrumb(breadArray))
        navigate('/shop/ProductDetail');
    };
    const handleCartClick = (item: any) => {
        const counterCartState = {
            id: item?.id,
            imgSrc: item?.imgSrc,
            specialText: item?.specialText,
            isSpecial: item?.isSpecial,
            paragraph: item?.paragraph,
            price: item?.price,
            quantity: 1,
            Name: item?.name,
            categoryName: item?.categoryName,
            isDiscount: item?.isDiscount,
            productId: item?.productId,
        };
        dispatch(addToCart(counterCartState));
    };

    const handleUpdateForm = (updatedItem: { id: number; productLabel: string; isChecked: boolean }) => {
        setCategory((prevState) =>
            prevState.map((category) => ({
                ...category,
                categoryContent: category.categoryContent.map((item) =>
                    item.id === updatedItem.id
                        ? { ...item, isChecked: !item.isChecked } // Toggle the isChecked value
                        : item
                ),
            }))
        );
        setIsDisabled(false);
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
        setIsDisabled(false);
        setValue(newValue as number[]);
    };

    function valuetext(value: number) {
        return `${value}°C`;
    };


    const handleFilter = () => {
        // Get a copy of the initial data and category data
        const productsData = [...initialData];
        const selectedCategories = category
            .flatMap((cat) => cat.categoryContent) // Flatten all categoryContent
            .filter((item) => item.isChecked) // Filter checked items
            .map((item) => item.id); // Extract IDs of checked items

        // Filter products by category
        const categoryFilteredData = selectedCategories.length
            ? productsData.filter((product) => selectedCategories.includes(product.productId))
            : productsData; // If no categories are selected, use all products

        // Filter products by price range
        const filteredData = categoryFilteredData.filter(
            (product) => Number(product.price) >= value[0] && Number(product.price) < value[1]
        );

        // Update the state with filtered data
        setData(filteredData);
    };

    const handleResetFilter = () => {
        setData(initialData);
        setCategory(categoryInitialData);
        setValue([1, 20]);
    };

    return (
        <div className="">
            <div className='px-40 flex justify-start mt-10' >
                <div className='w-1/4 ml-10' ></div>
                <div>
                    <BreadCrumb />
                </div>
            </div>
            <div className="flex lg:flex-row md:flex-col sm:flex-col justify-center lg:px-20 md:px-10 sm-px-0">
                <div className="flex flex-col gap-3 basis-1/4 mt-4 lg:items-start md:items-center sm:items-center">
                    <div className="text-xl font-semibold">Categories</div>
                    {category && category.map(item => (
                        <>
                            <div className="exp-reg ml-4">
                                <div className="text-lg text-gray-800 font-medium cursor-pointer">{item?.categoryLabel}</div>
                                <ul className="ml-4">
                                    {item?.categoryContent && item?.categoryContent.map((itemList, index) => {
                                        return (
                                            <li>
                                                <CustomInput
                                                    key={index}
                                                    type={'checkbox'}
                                                    id={String(itemList?.id)}
                                                    productLabel={itemList?.productLabel}
                                                    checked={itemList?.isChecked}
                                                    onChange={() => handleUpdateForm(itemList)}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <hr className="w-[60%] h-0 border-1 border-solid border-gray-300 mx-0 xl:block lg:block md:hidden sm:hidden" />
                        </>
                    ))}
                    <div className="flex flex-col items-center">
                        <div className='w-[15rem] mt-10' >
                            <div className='font-medium text-center text-gray-700'>Price Range (<span className='font-semibold' >£ 1</span> to <span className='font-semibold' >£ 20</span>)</div>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                min={1}
                                max={20}
                                step={2}
                                value={value}
                                color='primary'
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                className='mt-5'
                            />
                        </div>
                        <div className='flex gap-5 mt-10 ml-2' >
                            <motion.button whileTap={{ scale: 0.9 }}>
                                <Button
                                    fullWidth
                                    disabled={isDisabled}
                                    className="bg-[#0082E7] font-titleFont"
                                    children={'Filter'}
                                    onClick={handleFilter}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    placeholder={undefined}
                                />
                            </motion.button>
                            <motion.button whileTap={{ scale: 0.9 }}>
                                <Button
                                    fullWidth
                                    color='red'
                                    disabled={isDisabled}
                                    children={'Reset Filter'}
                                    onClick={handleResetFilter}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    placeholder={undefined}
                                />
                            </motion.button>
                        </div>

                    </div>

                </div>
                <div className="flex flex-row justify-center gap-10 flex-wrap basis-4/5">
                    {globalData && globalData.map(item => (
                        <div className="h-[27rem] mt-4 cursor-pointer hover:bg-softColor rounded-xl">
                            <div className="w-[15rem] relative" >
                                <img src={item.imgSrc} alt="product5" onClick={() => handleClick(item)} />
                                <div className="absolute top-0 left-0 ml-8">
                                    {item.isSpecial && (
                                        <div className='bg-light-green-600 p-2 border-2 border-t-0 rounded-b-xl ' >
                                            <div className='text-base text-white' >{item.specialText}</div>
                                        </div>
                                    )}
                                </div>
                                <motion.div whileTap={{ scale: 0.9 }} className="absolute top-0 left-40 ml-8"><img src={WishlistHeart} alt="" /> </motion.div>
                                <motion.div whileTap={{ scale: 0.9 }} className="absolute bottom-2 left-40 ml-10" onClick={() => handleCartClick(item)} ><img src={Whitebluebordercart} alt="" /></motion.div>
                            </div>
                            <div className=" p-4 w-[15em]">
                                <p className='font-sans'>{item.paragraph}</p>
                                <h3 className='text-2xl mt-4 font-semibold font-quicksand' >£ {item.price}</h3>
                            </div>
                        </div>
                    ))}
                    {globalData.length === 0 && (
                        <div className="mt-4">
                            No Products
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Product