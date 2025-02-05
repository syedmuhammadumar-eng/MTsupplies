
import CustomInput from '../Global/CustomInput';
import Whitebluebordercart from '../../assets/icons/whitebluebordercart.png';
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

// type IuniqueProps = {
//     name: string,
//     isIncluded: boolean,
//     id: string,
//     isChecked: boolean,
// };

const Product = () => {
    const [value, setValue] = useState<number[]>([1, 100]);
    const [globalData, setData] = useState<ProductInterface[]>([]);
    const [category, setCategory] = useState<categoryDataProps[]>([]);
    const searchedProduct = useSelector((state: RootState) => state.mtSupplies.searchedProduct);
    const searchedCategory = useSelector((state: RootState) => state.mtSupplies.selectedCategory);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleProductsCount, setVisibleProductsCount] = useState(12);
    // const [uniqueData, setUniqueData] = useState<IuniqueProps[]>([]);
    const [initialData, setInitialData] = useState<ProductInterface[]>([]);
    const productsPerPage = 12;

    const totalPages = Math.ceil(globalData.length / productsPerPage);

    const displayedProducts = isSmallScreen ? globalData.slice(0, visibleProductsCount) : globalData.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scroll(0, 0);
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
                    getProductList(category);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const getProductList = async (categorySelectionData) => {
        await AllProductsGetService('/product/get-all')
            .then((response) => {
                console.log(response);
                const allProducts = response.data?.products.map((item) => ({
                    id: item?._id,
                    productId: item?.productId,
                    imgSrc: item?.images[0]?.url,
                    specialText: item?.specialoffer,
                    isSpecial: item?.isSpecial,
                    paragraph: item?.description,
                    price: item?.price,
                    Name: item?.name,
                    quantity: item?.quantity,
                    isDiscount: item?.isDiscount,
                    categoryName: item?.categoryname,
                    category: item?.category,
                    stock: item?.stock,
                    discountpercent: item?.discountpercent,
                    discountprice: item?.discountprice,
                    subCategory: item?.subCategory,
                    isSelected: item?.isSelected,
                }));
                console.log(searchedCategory);
                if (searchedCategory.id) {
                    const updatedCategories = categorySelectionData.map((cat) =>
                        cat.id === searchedCategory.id ? { ...cat, isChecked: !cat.isChecked } : cat
                    );
                    setCategory(updatedCategories);

                    const selectedCategories = updatedCategories
                        .filter((cat) => cat.isChecked)
                        .map((cat) => cat.id);

                    const filteredProducts = allProducts.filter((item) => {
                        const isInSelectedCategory =
                            selectedCategories.length === 0 || selectedCategories.includes(item.category);

                        const isInPriceRange = item.isSpecial ? item.specialText >= String(value[0]) && item.specialText <= String(value[1]) : item.price >= String(value[0]) && item.price <= String(value[1]);

                        return isInSelectedCategory && isInPriceRange;
                    });
                    setData(filteredProducts);
                } else {
                    setData(allProducts);
                }
                setInitialData(allProducts);
            })
            .catch((error) => {
                console.log(error);
            })
    };

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
            ...item,
            id: item?.id,
            imgSrc: item?.imgSrc,
            specialText: item?.specialText,
            isSpecial: item?.isSpecial,
            paragraph: item?.paragraph,
            price: item?.price,
            quantity: 1,
            Name: item?.Name,
            categoryName: item?.categoryName,
            isDiscount: item?.isDiscount,
            productId: item?.productId,
        };
        dispatch(clearSearchedProduct());
        dispatch(setProductDetail(counterCartState));
        const breadArray = ['Shop', 'ProductDetail'];
        dispatch(setBreadCrumb(breadArray))
        navigate('/shop/ProductDetail');
    };

    const handleCartClick = (item: any) => {
        const counterCartState = {
            ...item,
            id: item?.id,
            imgSrc: item?.imgSrc,
            specialText: item?.specialText,
            isSpecial: item?.isSpecial,
            paragraph: item?.paragraph,
            price: item?.price,
            quantity: 1,
            Name: item?.Name,
            categoryName: item?.categoryName,
            isDiscount: item?.isDiscount,
            productId: item?.productId,
        };
        dispatch(addToCart(counterCartState));
    };

    const handleUpdateForm = (row) => {
        const updatedCategories = category.map((cat) =>
            cat.id === row.id ? { ...cat, isChecked: !cat.isChecked } : cat
        );
        setCategory(updatedCategories);

        const selectedCategories = updatedCategories
            .filter((cat) => cat.isChecked)
            .map((cat) => String(cat.id));

        const filteredProducts = initialData.filter((item) => {
            const isInSelectedCategory =
                selectedCategories.length === 0 || selectedCategories.includes(item.category);

            const isInPriceRange = item.isSpecial
                ? item.specialText >= String(value[0]) && item.specialText <= String(value[1])
                : item.price >= String(value[0]) && item.price <= String(value[1]);

            return isInSelectedCategory && isInPriceRange;
        });

        setData(filteredProducts);
    };

    const handleChange = (_event, newValue) => {
        setValue(newValue);

        const selectedCategories = category
            .filter((cat) => cat.isChecked)
            .map((cat) => String(cat.id));

        const filteredProducts = initialData.filter((item) => {
            const isInSelectedCategory =
                selectedCategories.length === 0 || selectedCategories.includes(item.category);

            const isInPriceRange = item.isSpecial
                ? item.specialText >= newValue[0] && item.specialText <= newValue[1]
                : item.price >= newValue[0] && item.price <= newValue[1];

            return isInSelectedCategory && isInPriceRange;
        });

        setData(filteredProducts);
    };

    const valuetext = (value: number) => {
        return `${value}°C`;
    };

    const handlePaginationChange = (value) => {
        setCurrentPage(value);
    };

    const handleViewMore = () => {
        setVisibleProductsCount((prevCount) => prevCount + productsPerPage);
    };

    // const handleTypeForm = (row, isChecked) => {
    //     const updatedData = uniqueData.map(item =>
    //         item.name === row.name ? { ...item, isChecked } : item
    //     );

    //     const data = initialData.map(item =>
    //         item.Name === row.name ? { ...item, isChecked } : item
    //     );



    //     const filteredData = data.filter(item => item.isChecked || item.isChecked === undefined);

    //     setData(filteredData);
    //     setUniqueData(updatedData);
    // };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className="">
            <div className='px-40 flex justify-start mt-10' >
                <div className='w-1/4' ></div>
                <div className='-ml-7' >
                    <BreadCrumb />
                </div>
            </div>
            <div className="flex lg:flex-row md:flex-col sm:flex-col justify-center lg:px-20 md:px-10 sm-px-0">
                <div className="flex flex-col gap-3 basis-1/4 mt-4 lg:items-start md:items-center sm:items-center">
                    <div className="text-xl font-medium text-blue-900">Category</div>
                    {category && category.map((item, index) => (
                        <>
                            <div className="exp-reg ml-4">
                                <CustomInput
                                    key={index}
                                    type={'checkbox'}
                                    id={String(item?.id)}
                                    productLabel={item?.categoryLabel}
                                    checked={item?.isChecked}
                                    onChange={() => handleUpdateForm(item)}
                                />
                            </div>
                        </>
                    ))}
                    {/* <div hidden={globalData.length > 0 ? false : true} className="text-xl font-medium text-blue-900 mt-4">Type</div>
                    {globalData && globalData.map((item, index) => (
                        <>
                            <div className="exp-reg ml-4" >
                                <CustomInput
                                    key={index}
                                    type={'checkbox'}
                                    id={String(index + 'type')}
                                    productLabel={item?.subCategory}
                                    checked={item?.isChecked}
                                    onChange={() => handleTypeForm(item, !item?.isChecked)}
                                />
                            </div>
                        </>
                    ))} */}
                    <div className="flex flex-col items-center">
                        <div className='w-[15rem] mt-10' >
                            <div className='flex justify-between font-medium text-center'><div className='text-blue-900'>Price</div> <span className='font-medium text-gray-500' >£ 1.00 - 100.00</span></div>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                min={1}
                                max={100}
                                step={1}
                                value={value}
                                color='primary'
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                getAriaValueText={valuetext}
                                className='mt-5'
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-10 flex-wrap basis-4/5 h-[50%]">
                    {displayedProducts && displayedProducts.map(item => (
                        <div className='h-[27rem]' key={item?.id}>
                            <div className="w-[18rem] flex flex-col shadow-lg hover:shadow-testShadow2 duration-500 mt-4 cursor-pointer hover:bg-gray-200" onClick={() => handleClick(item)}>
                                <div className="relative h-72">
                                    <img className='rounded-t-md w-full h-full object-cover cursor-pointer' src={item.imgSrc} alt="product5" />
                                    <div className="absolute top-0 left-0 ml-8">
                                        {item.isSpecial && (
                                            <div className='bg-light-green-600 p-2 rounded-b-md ' >
                                                <div className='text-sm text-white' >{item.isSpecial ? 'Special' : ''}</div>
                                            </div>

                                        )}
                                    </div>
                                    <motion.div whileTap={{ scale: 0.9 }} className="absolute bottom-2 left-[12.5rem] ml-10" onClick={(e) => { e.stopPropagation(); handleCartClick(item); }} ><img src={Whitebluebordercart} alt="" /></motion.div>
                                </div>
                                <div className="px-2 py-1 flex flex-col justify-between items-start h-[7rem]">
                                    <div>
                                        <p className="text-base font-medium text-gray-700 overflow-hidden">{item?.Name} - {truncateText(item?.paragraph, 50)}</p>
                                    </div>
                                    <div className='flex flex-col items-start' >
                                        {item?.isSpecial && <div className='flex gap-2 text-sm font-medium' ><div className='text-gray-500 line-through' >£ {Number(item.price).toFixed(2)}</div><div className='text-blue-900' >({(item?.discountpercent.toFixed(0))}% off)</div></div>}
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
            <div className={`${globalData.length === 0 ? 'lg:hidden' : 'lg:flex'} ml-20 mt-20 lg:flex md:flex sm:hidden justify-center`}>
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