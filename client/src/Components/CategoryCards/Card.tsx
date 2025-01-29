import { useNavigate } from 'react-router';
import blueLine from '../../assets/icons/blueline.png';
import { motion } from 'framer-motion';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
interface cardProps {
    imgSrc: any,
    label: string,
    id: string,
}

const Card: React.FC<cardProps> = ({ imgSrc, label, id }) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/shop')
    };
    return (
        <div
            id={id}
            className="shadow-md cursor-pointer group h-[24em] w-[13em] border border-gray-300 border-t-0 rounded-3xl overflow-hidden flex flex-col py-8 hover:bg-[#006fcc] duration-500 ease-linear"
            onClick={() => handleNavigation()}
        >
            {/* <img src={imgSrc} alt="Parties Decor" className="w-[12rem] self-center mt-4 rounded-full" /> */}
            <div className='place-self-center'><Avatar sx={{ width: 130, height: 130 }} alt="Remy Sharp" src={imgSrc} /></div>
            <h2 className="text-center font-bold mt-4 group-hover:text-white">{label}</h2>
            <img src={blueLine} alt="blueline" className="mt-4 self-center" />
            <div className="relative">
                <div className="h-[130px] w-[130px] bg-[#006fcc] group-hover:bg-white rounded-full absolute -right-6 top-10">
                    <div className="h-[100px] w-[100px] bg-white group-hover:bg-[#006fcc] rounded-full absolute right-0 bottom-0"></div>
                </div>
            </div>
        </div>
    )
}

export default Card