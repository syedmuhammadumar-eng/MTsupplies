
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
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { RootState } from '../../store';
import Pagination from '@mui/material/Pagination';
import { AllProductsGetService } from '../../global/GeneralService';

type categoryDataProps = {
    id: number,
    categoryLabel: string;
    isChecked: boolean,
};

type IuniqueProps = {
    name: string,
};

const categoryInitialData: categoryDataProps[] = [
    {
        id: 1,
        categoryLabel: 'Parties Decor',
        isChecked: false,
    },
    {
        id: 2,
        categoryLabel: 'Home Decor',
        isChecked: false
    },
    {
        id: 3,
        categoryLabel: 'Office Stationary',
        isChecked: false
    },
    {
        id: 4,
        categoryLabel: 'DIY households',
        isChecked: false
    },
    {
        id: 5,
        categoryLabel: 'Art & Craft',
        isChecked: false
    },
    {
        id: 6,
        categoryLabel: 'School Stationary',
        isChecked: false
    },

];

// const initialData: ProductInterface[] = [
//     {
//         id: '1',
//         productId: 1,
//         imgSrc: product1,
//         specialText: 'Special',
//         isSpecial: true,
//         paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
//         price: '1.12',
//         Name: 'Pencil',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pencils',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '2',
//         productId: 2,
//         imgSrc: product2,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Pen, its specifications and all other details of it',
//         price: '2.14',
//         Name: 'Pen',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pens',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '3',
//         imgSrc: product3,
//         productId: 2,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Pen, its specifications and all other details of it',
//         price: '3.16',
//         Name: 'Pen',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pens',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '4',
//         productId: 2,
//         imgSrc: product4,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Pen, its specifications and all other details of it',
//         price: '4.22',
//         Name: 'Pen',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pens',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '5',
//         productId: 1,
//         imgSrc: product5,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
//         price: '5.24',
//         Name: 'Pencil',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pencils',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '6',
//         productId: 1,
//         imgSrc: product1,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Pencil, its specifications and all other details of it',
//         price: '6.26',
//         Name: 'Pencil',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pencils',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '7',
//         productId: 2,
//         imgSrc: product2,
//         specialText: 'Special',
//         isSpecial: true,
//         paragraph: 'Brand Name - Pen, its specifications and all other details of it',
//         price: '7.32',
//         Name: 'Pen',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Pens',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '8',
//         productId: 3,
//         imgSrc: Brush1,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Brush, its specifications and all other details of it',
//         price: '8.34',
//         Name: 'Brush',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Brushes',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '9',
//         imgSrc: Brush2,
//         productId: 3,
//         specialText: '',
//         isSpecial: false,
//         paragraph: 'Brand Name - Brush, its specifications and all other details of it',
//         price: '9.36',
//         Name: 'Brush',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Brushes',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '10',
//         productId: 3,
//         imgSrc: Brush3,
//         specialText: 'Special',
//         isSpecial: true,
//         paragraph: 'Brand Name - Brush, its specifications and all other details of it',
//         price: '10.42',
//         Name: 'Brush',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Brushes',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '11',
//         productId: 3,
//         imgSrc: Brush4,
//         specialText: 'Special',
//         isSpecial: true,
//         paragraph: 'Brand Name - Brush, its specifications and all other details of it',
//         price: '11.44',
//         Name: 'Brush',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Brushes',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '12',
//         productId: 7,
//         imgSrc: Brush5,
//         specialText: 'Special',
//         isSpecial: true,
//         paragraph: 'Brand Name - Brush, its specifications and all other details of it',
//         price: '12.46',
//         Name: 'Brush',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Brushes',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
//     {
//         id: '13',
//         imgSrc: Brush4,
//         productId: 3,
//         specialText: 'Special',
//         isSpecial: true,
//         paragraph: 'Brand Name - Brush, its specifications and all other details of it',
//         price: '13.52',
//         Name: 'Brush',
//         quantity: 0,
//         isDiscount: false,
//         categoryName: 'Brushes',
//         isBestSelling: false,
//         discountpercent: 0,
//         discountprice: 0
//     },
// ];

const Product = () => {
    const [value, setValue] = useState<number[]>([1, 20]);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [globalData, setData] = useState<ProductInterface[]>([]);
    const [category, setCategory] = useState<categoryDataProps[]>([]);
    const searchedProduct = useSelector((state: RootState) => state.mtSupplies.searchedProduct);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleProductsCount, setVisibleProductsCount] = useState(12);
    const [uniqueData, setUniqueData] = useState<IuniqueProps[]>([]);
    const productsPerPage = 12;

    const totalPages = Math.ceil(globalData.length / productsPerPage);

    const displayedProducts = isSmallScreen ? globalData.slice(0, visibleProductsCount) : globalData.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        getProductList();
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        await AllProductsGetService('/cat/get-all')
            .then((response) => {
                console.log(response);
                if (response.data.categories.length > 0) {
                    const category = response.data?.categories.map((item) => ({
                        categoryLabel: item?.category,
                        id: item?._id,
                        isChecked: false
                    }));
                    setCategory(category);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const getProductList = async () => {
        await AllProductsGetService('/product/get-all')
            .then((response) => {
                console.log(response);
                // setUsers(response?.data?.products);
                const allProducts = response.data?.products.map((item) => ({
                    id: item?._id,
                    productId: 7,
                    imgSrc: item?.images[0]?.url,
                    specialText: item?.specialoffer,
                    isSpecial: item?.isSpecial,
                    paragraph: item?.description,
                    price: item?.price,
                    Name: item?.name,
                    quantity: 0,
                    isDiscount: false,
                    categoryName: 'Brushes',
                    stock: item?.stock,
                    discountpercent: item?.discountpercent,
                    discountprice: item?.discountprice,
                }));
                setData(allProducts);
                const uniqueNames: IuniqueProps[] = Array.from(new Set(response.data?.products.map((item) => ({ name: item?.name }))));

                setUniqueData(uniqueNames);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    //   id: '1',
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

    useEffect(() => {
        // window.scrollTo(0, 0);
    }, [displayedProducts]);

    useEffect(() => {
        const updateScreenSize = () => {
            setIsSmallScreen(window.innerWidth <= 768); // Small screen breakpoint
        };
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    useEffect(() => {
        if (searchedProduct.length > 0) {
            const filterGrid = globalData.filter(item => item.categoryName.toLowerCase() === searchedProduct[0].categoryName.toLowerCase());
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

    const handleUpdateForm = (row) => {
        const filterData = globalData.filter(item => item.categoryName === row.categoryLabel);
        const data = Array.from(new Set(filterData.map((item) => ({ name: item?.Name }))));
        setUniqueData(data);
        setIsDisabled(false);
        const categoryArray = [...category];
        categoryArray[row.id - 1].isChecked = !row.isChecked;
        setCategory(categoryArray);
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
        const productsData = [...globalData];
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
        setData(globalData);
        setCategory(categoryInitialData);
        setValue([1, 20]);
    };

    const handlePaginationChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleViewMore = () => {
        setVisibleProductsCount((prevCount) => prevCount + productsPerPage);
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
                    <div className="text-xl font-medium text-blue-900">Category</div>
                    {category && category.map((item, index) => (
                        <>
                            <div className="exp-reg ml-4">
                                {/* <div className="text-lg text-gray-800 font-medium cursor-pointer">{item?.categoryLabel}</div> */}
                                <CustomInput
                                    key={index}
                                    type={'checkbox'}
                                    id={String(item?.id)}
                                    productLabel={item?.categoryLabel}
                                    checked={item?.isChecked}
                                    onChange={() => handleUpdateForm(item)}
                                />
                            </div>
                            {/* <hr className="w-[60%] h-0 border-1 border-solid border-gray-300 mx-0 xl:block lg:block md:hidden sm:hidden" /> */}
                        </>
                    ))}
                    <div hidden={uniqueData.length > 0 ? false : true} className="text-xl font-medium text-blue-900 mt-4">Type</div>
                    {uniqueData && uniqueData.map((item, index) => (
                        <>
                            <div className="exp-reg ml-4">
                                {/* <div className="text-lg text-gray-800 font-medium cursor-pointer">{item?.categoryLabel}</div> */}
                                <CustomInput
                                    key={index}
                                    type={'checkbox'}
                                    id={String(index + 'type')}
                                    productLabel={item?.name}
                                // checked={item?.isChecked}
                                // onChange={() => handleUpdateForm(item)}
                                />
                            </div>
                            {/* <hr className="w-[60%] h-0 border-1 border-solid border-gray-300 mx-0 xl:block lg:block md:hidden sm:hidden" /> */}
                        </>
                    ))}
                    <div className="flex flex-col items-center">
                        <div className='w-[15rem] mt-10' >
                            <div className='flex justify-between font-medium text-center'><div className='text-blue-900'>Price</div> <span className='font-medium text-gray-500' >£ 1.00 - 20.00</span></div>
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
                            <motion.button>
                                <Button
                                    variant={'outlined'}
                                    fullWidth
                                    disabled={isDisabled}
                                    className="bg-[#0082E7] font-titleFont"
                                    children={'Filter'}
                                    onClick={handleFilter}
                                />
                            </motion.button>
                            <motion.button>
                                <Button
                                    variant={'contained'}
                                    color='error'
                                    fullWidth
                                    disabled={isDisabled}
                                    children={'Reset Filter'}
                                    onClick={handleResetFilter}
                                />
                            </motion.button>
                        </div>

                    </div>

                </div>
                {/* shadow-[#979995] */}
                <div className="flex justify-center gap-10 flex-wrap basis-4/5 h-[50%]">
                    {displayedProducts && displayedProducts.map(item => (
                        <div className='h-[27rem]' key={item?.id} >
                            <div className="w-[18rem] flex flex-col shadow-lg hover:shadow-testShadow2 duration-500 mt-4 cursor-pointer hover:bg-gray-200" onClick={() => handleClick(item)}>
                                <div className="relative h-72">
                                    <img className='rounded-t-md w-full h-full object-cover cursor-pointer ' src={item.imgSrc} alt="product5" />
                                    <div className="absolute top-0 left-0 ml-8">
                                        {item.isSpecial && (
                                            <div className='bg-light-green-600 p-2 rounded-b-md ' >
                                                <div className='text-sm text-white' >{item.isSpecial ? 'Special' : ''}</div>
                                            </div>

                                        )}
                                    </div>
                                    {/* <motion.div whileTap={{ scale: 0.9 }} className="absolute top-0 left-40 ml-8"><img src={WishlistHeart} alt="" /> </motion.div> */}
                                    <motion.div whileTap={{ scale: 0.9 }} className="absolute bottom-2 left-[12.5rem] ml-10" onClick={() => handleCartClick(item)} ><img src={Whitebluebordercart} alt="" /></motion.div>
                                </div>
                                <div className="px-2 py-1 flex flex-col justify-between items-start h-[7rem]">
                                    <div>
                                        <p className="text-base font-semibold text-black overflow-hidden">{item?.Name} - {item.paragraph}</p>
                                    </div>
                                    <div className='flex flex-col items-start' >
                                        {item?.isSpecial && <div className='flex gap-2 text-sm font-medium' ><div className='text-gray-500 line-through' >£ {Number(item.price).toFixed(2)}</div><div className='text-blue-900' >({(item?.discountpercent)}% off)</div></div>}
                                        <h3 className="text-lg font-semibold">{item?.isSpecial ? `£ ${Number(item?.specialText).toFixed(2)}` : `£ ${Number(item.price).toFixed(2)}`}</h3>
                                    </div>
                                </div>
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
            <div className='ml-20 mt-20 lg:flex md:flex sm:hidden justify-center'>
                <Pagination count={totalPages} page={currentPage} onChange={handlePaginationChange} />
            </div>
            {visibleProductsCount < globalData.length && (
                <div className='mt-20 xl:hidden lg:hidden md:hidden sm:flex justify-center'>
                    <Button
                        variant='contained'
                        children={'View More'}
                        sx={{ backgroundColor: 'tan' }}
                        onClick={handleViewMore}
                    />
                </div>
            )}
        </div>
    )
}

export default Product