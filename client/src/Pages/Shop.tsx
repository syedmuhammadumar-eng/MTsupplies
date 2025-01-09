import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import EStore from '../Components/EStore/EStore'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearchedProduct } from '../redux/mtSupplies';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        return (() => {
            dispatch(clearSearchedProduct());
        })
    }, []);

    return (
        <>
            <Header />
            <EStore />
            <Footer />
        </>
    )
}

export default Shop