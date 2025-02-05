import { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { GetService } from "../../global/GeneralService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Order = () => {
    const token = useSelector((state: RootState) => state?.credentialReducer?.userToken);
    const [form, setForm] = useState([{
        createdAt: "",
        itemPrice: 0,
        orderItems: [{
            image: "",
            name: "",
            price: 0,
            product: "",
            quantity: 0,
            _id: "",
        }],
        orderStatus: "",
        paymentMethod: "",
        shippingCharges: 0,
        shippingInfo: { address: '', city: '', country: '' },
        tax: 12,
        totalAmount: 12,
        user: "",
        __v: 0,
        _id: "",
    }]);

    useEffect(() => {
        getOrderList();
    }, [])

    const getOrderList = () => {
        GetService('/order/my-orders', token)
            .then((response) => {
                if (response?.data?.success) {
                    const mapData = response.data?.orders.map(item => {
                        const splitDate = item.createdAt.split('T');
                        return {
                            ...item,
                            createdAt: splitDate[0],
                        }
                    })
                    setForm(mapData);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div>
            <Header />
            <div className="border-t pt-16 px-28">
                <div className="text-2xl mb-2" >
                    <div className="font-semibold" >Orders</div>
                </div>
                <div className="min-h-screen" >
                    {form && form.map((item) => (
                        item.orderItems && item.orderItems.map((orderItem, orderIndex) => (
                            <div key={orderIndex} className="flex flex-col py-4 border-b border-gray-300 text-gray-700 md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center gap-6 text-sm">
                                    <img className="w-16 sm:w-20" src={orderItem?.image} alt="" />
                                    <div>
                                        <p className="sm:text-base font-semibold">{orderItem?.name}</p>
                                        <div className="flex items-center gap-3 mt-2 text-base text-gray-700 font-medium">
                                            <p className="text-lg">£ {orderItem?.price}</p>
                                            <p className="">Quantity: {orderItem?.quantity}</p>
                                            {/* <p className="">Size: M</p> */}
                                        </div>
                                        {/* <p className="mt-2 font-medium">Date: <span className="text-gray-400 font-medium">{item?.createdAt}</span></p> */}
                                    </div>
                                </div>
                                <div className="md:w-1/2 flex justify-between">
                                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                                    {/* <p className="text-base">£ {orderItem?.price}</p>
                                    <p className="text-base">Quantity: {orderItem?.quantity}</p> */}
                                    </div>
                                    <p className="mt-2 font-medium">Date: <span className="text-gray-400 font-medium">{item?.createdAt}</span></p>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Order;