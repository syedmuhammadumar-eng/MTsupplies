import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { product1 } from "../../assets/index";

const Order = () => {
  return (
    <div>
        <Header />
        <div className="border-t pt-16 px-28">
            <div className="text-2xl mb-2" >
                <div className="font-semibold" >Orders</div>
            </div>
            <div>
                <div className="flex flex-col py-4 border-b border-gray-300 text-gray-700 md:flex-row md:items-center md:justify-between gap-4" >
                    <div className="flex items-start gap-6 text-sm">
                        <img className="w-16 sm:w-20" src={product1} alt="" />
                        <div>
                            <p className="sm:text-base font-semibold" >Pencil</p>
                            <div className="flex items-center gap-3 mt-2 text-base text-gray-700 font-medium">
                                <p className="text-lg" >£ 2.49</p>
                                <p className="">Quantity: 1</p>
                                <p className="">Size: M</p>
                            </div>
                            <p className="mt-2 font-medium">Date: <span className="text-gray-400 font-medium">25, June, 2024</span></p>
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-between" >
                        <div className="flex items-center gap-2" >
                            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                            <p className="text-sm md:text-base">Ready to ship</p>
                        </div>
                        <button className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm" >Track Order</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default Order;