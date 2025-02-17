import Whitebluebordercart from '../../assets/icons/whitebluebordercart.png';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart, clearSearchedProduct, setBreadCrumb, setProductDetail } from '../../redux/mtSupplies';
import { motion } from 'framer-motion';
interface imgSrc {
    name: string,
    price: string,
    imgSrc: any,
    id: string,
    specialText: string,
    isSpecial: boolean,
    paragraph: string,
    categoryName: string,
    isDiscount: boolean,
    productId: number
    discountpercent: number,
    bestSeller: boolean,
    quantity: number,
    stock: number
}


const SellingCards: React.FC<imgSrc> = ({ imgSrc, specialText, stock, isSpecial, paragraph, price, id, name, categoryName, isDiscount, productId, discountpercent, bestSeller }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        const counterCartState = {
            id: id,
            imgSrc: imgSrc,
            specialText: specialText,
            isSpecial: isSpecial,
            paragraph: paragraph,
            price: price,
            quantity: 1,
            Name: name,
            categoryName: categoryName,
            isDiscount: isDiscount,
            productId: productId,
            discountpercent: discountpercent,
            bestSeller: bestSeller,
            stock: stock,
        };
        dispatch(clearSearchedProduct())
        dispatch(setProductDetail(counterCartState));
        // dispatch(removeProductDetail());
        const breadArray = ['Shop', 'ProductDetail'];
        dispatch(setBreadCrumb(breadArray));
        navigate('/shop/ProductDetail');
    };
    const handleCartCounter = () => {
        const counterCartState = {
            id: id,
            imgSrc: imgSrc,
            specialText: specialText,
            isSpecial: isSpecial,
            paragraph: paragraph,
            price: price,
            quantity: 1,
            Name: name,
            categoryName: categoryName,
            isDiscount: isDiscount,
            productId: productId,
            discountpercent: discountpercent,
            bestSeller: bestSeller,
            stock: stock,
        };
        dispatch(addToCart(counterCartState));
        // dispatch(resetCart());
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div className={'h-[27rem]'} key={id} >
            <div className="w-[18rem] flex flex-col shadow-lg hover:shadow-testShadow2 duration-500 mt-4 cursor-pointer hover:bg-gray-200"
                onClick={() => handleClick()}
            >
                <div className="relative h-72">
                    <img className='rounded-t-md w-full h-full object-cover cursor-pointer ' src={imgSrc} alt="product5" />
                    <div className="absolute top-0 left-0 ml-8">
                        {isSpecial && (
                            <div className='bg-light-green-600 p-2 rounded-b-md ' >
                                <div className='text-sm text-white' >{isSpecial ? 'Special' : ''}</div>
                            </div>

                        )}
                    </div>
                    <motion.div whileTap={{ scale: 0.9 }} className="absolute bottom-2 left-[12.5rem] ml-10" onClick={(e) => { e.stopPropagation(); handleCartCounter(); }} ><img src={Whitebluebordercart} alt="" /></motion.div>
                </div>
                <div className="px-2 py-1 flex flex-col justify-between items-start h-[7rem]">
                    <div>
                        <p className="text-base font-medium text-gray-700 overflow-hidden">{name} - {truncateText(paragraph, 50)}</p>
                    </div>
                    <div className='flex flex-col items-start' >
                        {isSpecial && <div className='flex gap-2 text-sm font-medium' ><div className='text-gray-500 line-through' >£ {Number(price).toFixed(2)}</div><div className='text-blue-900' >({(discountpercent && discountpercent.toFixed(0))}% off)</div></div>}
                        <h3 className="text-lg font-semibold">{isSpecial ? `£ ${Number(specialText).toFixed(2)}` : `£ ${Number(price).toFixed(2)}`}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellingCards;