import { useEffect, useState } from "react";
import { AllProductsGetService } from "../../../global/GeneralService";

const AdminUser = () => {
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
    shippingInfo: { fullName: '', Phone: '', address: '', city: '', country: '' },
    tax: 0,
    totalAmount: 0,
    user: "",
    userName: "",
    __v: 0,
    _id: "",
  }]);
  useEffect(() => {
    getAllOrders();
  }, [])

  const getAllOrders = () => {
    AllProductsGetService('/order/all-orders')
      .then((response) => {
        const mapData = response.data?.orders.map(item => {
          const splitDate = item.createdAt.split('T');
          return {
            ...item,
            createdAt: splitDate[0],
          }
        })
        setForm(mapData);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className="users text-mainBg">
      <div className="info flex items-center gap-5 mb-5 flex-wrap">
        <div className="text-4xl font-bold text-mainBg" >Orders</div>
      </div>
      {form && form.map((item, index) => (
        <div key={index}>
          <div className="m-1 text-sm" ><span className="font-semibold text-base" >User:</span> {item?.userName || 'Garbarge Name'}</div>
          {item?.orderItems && item.orderItems.map((orderItem, orderIndex) => (
            <div key={orderIndex} className="bg-[#f9fafb] border border-gray-400 p-5 font-medium text-sm flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-wrap justify-around gap-5 m-1">

              <div className="">
                <div className="font-semibold" >{orderItem.name}</div>
                <div className="my-2" >{item?.shippingInfo?.fullName || 'No Name Provided'}</div>
                <div>{item?.shippingInfo?.address}</div>
                <div>{item?.shippingInfo?.city}, {item?.shippingInfo?.country}, {item?.shippingInfo?.Phone || 'No Contact Provided'}</div>
              </div>

              <div className="">
                <div className="my-2" ><span className="font-semibold">Method: </span>{item?.paymentMethod}</div>
                <div><span className="font-semibold" >Payment:</span> {item?.orderStatus}</div>
                <div><span className="font-semibold" >Date:</span> {item?.createdAt}</div>
              </div>

              <div className="">
                <div><span className="font-semibold" >Total Price:</span> £ {item?.itemPrice}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminUser;