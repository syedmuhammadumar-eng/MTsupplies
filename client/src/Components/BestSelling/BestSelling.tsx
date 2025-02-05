import { useEffect, useState } from 'react';
import SellingCards from './SellingCards';
import Slider from "react-slick";
import { Product } from '../../redux/mtSupplies';

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

const BestSelling = ({ bestSelling }) => {
    const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        prevArrow: <CustomPrevArrow />, // Add custom previous arrow
        nextArrow: <CustomNextArrow />, // Add custom next arrow
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    useEffect(() => {
        if (bestSelling.length > 0) {
            const filteredBestSellingData = bestSelling.filter(item => item.bestseller);
            setBestSellingProducts(filteredBestSellingData);
        }
    }, [bestSelling])

    return (
        <>
            <div className="flex justify-center items-center gap-2 py-20" >
                <div className='bg-gray-600 w-[2rem] h-[0.14rem]' ></div>
                <div className='font-medium text-4xl'><span className='text-gray-600' >Best</span> Selling</div>

            </div>
            <div className="slider-container w-4/5 place-self-center">
                <Slider {...settings}>
                    {bestSellingProducts && bestSellingProducts.map((item, index) => (
                        <SellingCards
                            key={index}
                            id={item?.id}
                            imgSrc={item?.imgSrc}
                            specialText={item?.specialText}
                            isSpecial={item?.isSpecial}
                            paragraph={item?.paragraph}
                            price={item?.price}
                            name={item?.Name}
                            categoryName={item?.categoryName}
                            isDiscount={item?.isDiscount}
                            productId={item?.productId}
                            discountpercent={item?.discountpercent}
                            bestSeller={item?.bestseller}
                        />
                    ))}
                </Slider>
            </div>
        </>

    )
}

export default BestSelling