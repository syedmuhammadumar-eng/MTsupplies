import '../index.css';
import Header from "../Components/Header/Header";
import Hero from '../Components/Hero/Hero';
import Logo from '../Components/Logo/Logo';
import CategoryCards from '../Components/CategoryCards/CategoryCards';
import MassonryCategory from '../Components/MassonryCategory/MassonryCategory';
import ExploreCategory from '../Components/ExploreCategory/ExploreCategory';
import Brand from '../Components/Brand/Brand';
import Footer from '../Components/Footer/Footer';
import BestSelling from '../Components/BestSelling/BestSelling';
import { useEffect, useState } from 'react';
import { AllProductsGetService } from '../global/GeneralService';
import { Product as ProductInterface, setRelatedProductData, setSearchProductData } from '../redux/mtSupplies';
import { useDispatch } from 'react-redux';

type categoryDataProps = {
    id: number,
    categoryLabel: string;
    isChecked: boolean,
};

const Home = () => {
    const [bestSelling, setBestSelling] = useState<ProductInterface[]>([]);
    const [category, setCategory] = useState<categoryDataProps[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        getProductList();
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        await AllProductsGetService('/cat/get-all')
            .then((response) => {
                console.log(response);
                if (response.data.categories.length > 0) {
                    const category = response.data?.categories.map((item) => ({
                        ...item,
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
                    ...item,
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
                
                setBestSelling(allProducts);
                dispatch(setSearchProductData(allProducts));
                dispatch(setRelatedProductData(allProducts));
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <>
            <div>
                <Header />
                <Hero />
                <Logo />
                <CategoryCards category={category} />
                <BestSelling bestSelling={bestSelling} />
                <MassonryCategory />
                <ExploreCategory category={category} />
                <Brand />
                {/* <Product /> */}
                <Footer />
            </div>
        </>
    )
}

export default Home