import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { setSelectedCategory } from '../../redux/mtSupplies';
import { useDispatch } from 'react-redux';

const ExploreCategory = ({ category }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigation = (item) => {
        const payload = {
            ...item,
        };
        dispatch(setSelectedCategory(payload))
        navigate('/shop');
    };

    return (
        <>
            <div className="flex justify-center items-center gap-2 mt-8 py-8 flex-wrap">
                <div className='bg-gray-600 w-[2rem] h-[0.14rem]' ></div>
                <div className="font-medium lg:text-4xl md:text-3xl sm:text-2xl" ><span className='text-gray-600' >Explore </span>Popular Categories</div>
            </div>
            <div className='flex flex-row justify-center gap-10 flex-wrap mt-8 py-8' >
                {category && category.map((item, index) => (
                    <motion.div key={index} className='cursor-pointer' whileHover={{ y: -10, transition: { duration: 0.3 } }} onClick={() => handleNavigation(item)} >
                        <div className=""><img src={item.images[0].url} alt="pencil" className="h-60" /></div>
                        <div className="text-center mt-4 font-semibold"><p>{item?.category}</p></div>
                    </motion.div>
                ))}
            </div>

        </>
    )
}

export default ExploreCategory