import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setBreadCrumb, setSearchItem } from '../../redux/mtSupplies';

interface searchCardProps {
    id: string,
    quantity: number,
    productId: number,
    Name: string,
    price: string,
    paragraph: string,
    imgSrc: string,
    isSpecial: boolean,
    specialText: string,
    isDiscount: boolean,
    categoryName: string,
    isBestSelling: boolean,
    discountpercent: number,
    discountprice: number,
    category: string,
    isChecked: boolean,
    subCategory: string,
}

const SearchCard = ({ id, productId, isDiscount, specialText, isSpecial, price, imgSrc, Name, paragraph, categoryName, isBestSelling, discountpercent, discountprice, category, isChecked, subCategory }: searchCardProps) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleNavigation = () => {
        const counterCartState = {
            id: id,
            quantity: 1,
            productId: productId,
            isDiscount: isDiscount,
            imgSrc: imgSrc,
            specialText: specialText,
            isSpecial: isSpecial,
            paragraph: paragraph,
            price: price,
            Name: Name,
            categoryName: categoryName,
            isBestSelling: isBestSelling,
            discountpercent: discountpercent,
            discountprice: discountprice,
            category: category,
            isChecked: isChecked,
            subCategory: subCategory,
        };
        const searchedProduct = [counterCartState];
        const breadArray = ['Shop'];
        dispatch(setBreadCrumb(breadArray));
        dispatch(setSearchItem(searchedProduct));
        navigate('/shop/ProductDetail');
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='flex gap-5 w-full h-1/2 hover:bg-[#e0e0e0] rounded-xl cursor-pointer px-2 bg-gray-200'
            onClick={() => handleNavigation()}
        >
            <img src={imgSrc} className='w-14 object-contain' ></img>
            <div className='flex flex-col justify-evenly' >
                <div className='text-base font-semibold' >
                    {Name}
                </div>
                <div className='text-xs' >
                    {paragraph}.
                </div>
            </div>
        </motion.div>
    );
};

export default SearchCard;