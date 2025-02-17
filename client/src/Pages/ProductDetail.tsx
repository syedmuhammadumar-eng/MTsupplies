import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import BreadCrumb from '../Components/Global/BreadCrumb';
import Collapse from '../Components/Global/Collapse';
import SellingCards from '../Components/BestSelling/SellingCards';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart, Product } from '../redux/mtSupplies';
import { Button } from '@material-tailwind/react';
import Slider from "react-slick";

// Custom Previous Arrow Component
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="custom-arrow custom-prev-arrow"
            onClick={onClick}
            style={{
                position: 'absolute',
                top: '50%',
                left: '-40px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px', // Size of the square container
                height: '40px', // Size of the square container
                borderRadius: '4px', // Optional: Rounded corners
                transition: 'background-color 0.3s ease',
                color: '#0082E7',
            }}
            onMouseEnter={(event) => {
                const target = event.target as HTMLElement;
                target.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(event) => {
                const target = event.target as HTMLElement;
                target.style.backgroundColor = 'transparent';
            }}
        >
            &#10094;
        </div>
    );
};

// Custom Next Arrow Component
const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="custom-arrow custom-next-arrow"
            onClick={onClick}
            style={{
                position: 'absolute',
                top: '50%',
                right: '-40px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px', // Size of the square container
                height: '40px', // Size of the square container
                borderRadius: '4px', // Optional: Rounded corners
                transition: 'background-color 0.3s ease',
                color: '#0082E7',
            }}
            onMouseEnter={(event) => {
                const target = event.target as HTMLElement;
                target.style.backgroundColor = '#f0f0f0';
            }}
            onMouseLeave={(event) => {
                const target = event.target as HTMLElement;
                target.style.backgroundColor = 'transparent';
            }}
        >
            &#10095;
        </div>
    );
};

const ProductDetail = () => {
    const { productDetails, searchedProduct, relatedProductData } = useSelector((state: RootState) => state.mtSupplies);
    const [form, setForm] = useState<Product[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    const [relatedSearchData, setRelatedSearchData] = useState<Product[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!searchedProduct.length) {
            const products = [...productDetails];
            if (products.length > 0) {
                const splitArray = products[0].paragraph?.split(',') || [];
                if (splitArray.length > 1 && !splitArray[1].includes('<br />')) {
                    products[0] = { ...products[0], paragraph: `${splitArray[0]}, <br />${splitArray[1]}` }
                };
            };
            const filteredData = relatedProductData && relatedProductData.filter(item => item?.categoryName?.toLowerCase() === products[0]?.categoryName?.toLowerCase() && item?.id !== products[0]?.id);
            setRelatedSearchData(filteredData);
            setForm(products);
        } else {
            const filteredData = relatedProductData && relatedProductData.filter(item => item?.categoryName?.toLowerCase() === searchedProduct[0]?.categoryName?.toLowerCase() && item?.id !== searchedProduct[0]?.id);
            setRelatedSearchData(filteredData);
            setForm(searchedProduct);
        }

    }, [productDetails, searchedProduct, relatedProductData]);

    useEffect(() => {
        console.log(searchedProduct);
    }, [searchedProduct]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1725, // xl
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1600, // xl
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 1280, // xl
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1200, // xl
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // lgl
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 960, // lg
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768, // mdl
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 728, // mdl
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 667, // md
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 500, // sml
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 375, // sm
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 320, // xs
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const handleAddCart = () => {
        const payload = { ...form[0] }
        dispatch(addToCart(payload));
    };

    const increaseProductDetailQuantity = () => {
        const newForm = form.map(item => ({
            ...item,
            quantity: item.quantity + 1,
        }));

        setForm(newForm);
    };

    const decreaseProductDetailQuantity = () => {
        const newForm = form.map(item => ({
            ...item,
            quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
        }));

        setForm(newForm);
    };

    return (
        <>
            <Header />
            <div >
                <div className="flex flex-wrap justify-center">
                    {/* Left Section: Image */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="bg-white flex items-center justify-center flex-wrap overflow-hidden w-full">
                            <img
                                src={form && form[0]?.imgSrc}
                                // src={pencil}
                                alt="Product1"
                                className="object-contain max-w-full h-[30rem]"
                            />
                        </div>
                    </div>
                    {/* Right Section: Product Details */}
                    <div className="w-full md:w-1/2 p-4 md:p-10">
                        <div>
                            <BreadCrumb />
                        </div>
                        <div className='xl:w-[32rem] lg:w-[30rem] md:w-[26rem] sm:w-[29rem] p-2' >
                            <div className="flex flex-col flex-wrap mt-6">
                                <label className='lg:text-2xl md:text-2xl font-semibold'>{form[0]?.Name}</label>
                                <label
                                    className="lg:text-xl md:text-3xl mt-2 font-medium text-gray-500"
                                    dangerouslySetInnerHTML={{
                                        __html: form && form[0]?.paragraph,
                                    }}
                                ></label>
                            </div>
                            <div className="flex items-center gap-4 mt-6">
                                <label className="text-2xl md:text-3xl font-bold">
                                    £ {form && form[0]?.isSpecial ? Number(form[0]?.specialText).toFixed(2) : form[0]?.price}
                                </label>
                                {form && form[0]?.isSpecial && (
                                    <>
                                        <label className="line-through text-gray-500">£ {form && (Number(form[0].price).toFixed(2))}</label>
                                    </>
                                )}
                            </div>
                            <div className="mt-1">
                                {form && form[0]?.isSpecial && (
                                    <label className="text-green-700 font-medium">({form && (Number(form[0].discountpercent).toFixed(0))}% off)</label>
                                )}
                            </div>
                            <div className="flex gap-4 mt-4 items-center">
                                <button
                                    onClick={() => decreaseProductDetailQuantity()}
                                    className="w-8 h-8 bg-gray-100 text-xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-gray-300 hover:border-gray-300"
                                >
                                    -
                                </button>
                                <label className="font-medium text-lg">
                                    {form && form[0]?.quantity}
                                </label>
                                <button
                                    disabled={form && form[0]?.quantity === form[0]?.stock}
                                    onClick={() => increaseProductDetailQuantity()}
                                    className={`w-8 h-8 bg-gray-100 text-xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-gray-300 hover:border-gray-300`}
                                >
                                    +
                                </button>
                                <Button
                                    className="bg-gradient-to-r from-[#0082E7] to-[#0053A5] p-3 md:px-8 font-medium rounded-sm text-gray-200 hover:text-white"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    onClick={() => handleAddCart()}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                            <div className="mt-8 ">
                                {/* <label className="text-base md:text-lg font-medium">
                                SKU: 8901425031926
                            </label> */}
                            </div>
                            <div className="flex flex-wrap mt-8 justify-between w-full rounded-sm p-1">
                                <label className="text-base md:text-lg font-medium">
                                    Estimated Delivery
                                </label>
                                <label className="text-base md:text-lg font-bold">
                                    Within a Week
                                </label>
                            </div>
                            {/* <div className="mt-4 flex flex-wrap justify-between w-full p-1">
                                <select
                                    className="p-1 w-20 outline-none rounded-sm border border-gray-400 text-gray-500"
                                    value={"UK"}
                                >
                                    <option value={"1"}>UK</option>
                                </select>
                                <select
                                    className="p-1 w-[11rem] md:w-64 outline-none rounded-sm border border-gray-400 text-gray-500"
                                    value={"Brimingham Other"}
                                >
                                    <option value={"1"}>Brimingham Other</option>
                                </select>
                            </div> */}
                            <div className="mt-6">
                                <Collapse />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='mt-40 flex justify-center flex-wrap' >
                <div className='w-3/4' >
                    <div>
                        <label className='text-3xl font-semibold' >Product details</label>
                    </div>
                    <div className='mt-10 flex justify-between items-center border-b border-gray-300 pb-2'>
                        <div>
                            <label className='text-lg font-medium' >COLOUR:</label>
                        </div>
                        <div>
                            <label className='text-lg text-gray-500' >Black</label>
                        </div>
                    </div>
                    <div className='mt-10 flex justify-between items-center border-b border-gray-300 pb-2'>
                        <div>
                            <label className='text-lg font-medium' >PACKAGE CONTENTS:</label>
                        </div>
                        <div>
                            <label className='text-lg text-gray-500' >{form[0]?.stock} {form[0]?.Name}</label>
                        </div>
                    </div>
                    <div className='mt-10 flex justify-between items-center border-b border-gray-300 pb-2'>
                        <div>
                            <label className='text-lg font-medium' >ORIGIN:</label>
                        </div>
                        <div>
                            <label className='text-lg text-gray-500' >Designed and Made in UK</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-40 flex justify-center flex-wrap' >
                <div className='w-3/4' >
                    <div>
                        <label className='text-3xl font-semibold' >Related Products</label>
                    </div>
                </div>
                <div className="slider-container lgl:w-[75%] lg:w-[80%] mdl:w-[80%] md:w-[80%] sml:w-[60%] sm:w-[60%] xs:w-[60%] place-self-center">
                    <Slider {...settings}>
                        {relatedSearchData &&
                            relatedSearchData.map((item, index) => (
                                <SellingCards
                                    key={index}
                                    id={item.id}
                                    imgSrc={item.imgSrc}
                                    specialText={item.specialText}
                                    isSpecial={item.isSpecial}
                                    paragraph={item.paragraph}
                                    price={item.price}
                                    name={item.Name}
                                    categoryName={item?.categoryName}
                                    isDiscount={item?.isDiscount}
                                    productId={item?.productId}
                                    discountpercent={item?.discountpercent}
                                    bestSeller={item?.isBestSelling}
                                    quantity={item?.quantity}
                                    stock={item?.stock}
                                />
                            ))}
                    </Slider>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDetail;