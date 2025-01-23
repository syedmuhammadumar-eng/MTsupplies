import { useState } from 'react'

const Collapse = () => {
    const [isOpen, setIsOpen] = useState<string>('');

    const toggleCollapse = (id: string) => {
        setIsOpen(isOpen === id ? '' : id);
    };

    const data = [
        {
            id: '1',
            title: 'Delivery Policy',
            content: 'We strive to deliver your order within 7 business days. Shipping costs and estimated delivery times are displayed at checkout. Once your order is shipped, you will receive a tracking number.'
        },
        {
            id: '2',
            title: 'Returns Policy',
            content: 'We accept returns within 3 days of delivery. Items must be unused, in original packaging, and accompanied by proof of purchase. Refunds are processed within 3 days of receiving the returned product.'
        },

    ];
    return (

        <div className="w-full mt-10">
            {/* Header */}
            {data && data.map((item, index) => (
                <div key={index} >
                    <div
                        id={item?.id}
                        className={`flex justify-between items-center text-blue-500 px-4 py-2 cursor-pointer transition-all ease-in-out ${isOpen === '' ? 'border-b-2' : ''}`}
                        onClick={() => toggleCollapse(item?.id)}
                    >
                        <h2 className="text-lg font-semibold">{item?.title}</h2>
                        <span className="transform transition-transform">
                            {isOpen === item?.id ? (
                                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            ) : (
                                <svg data-accordion-icon className="w-3 h-3 rotate-90 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                </svg>
                            )}
                        </span>
                    </div>

                    <div
                        id={item?.id}
                        className={`overflow-hidden transition-all ease-in-out ${isOpen === item?.id ? 'max-h-screen border-b-2' : 'max-h-0'}`}
                    >
                        <div className={`p-4 bg-gray-100 ${isOpen === item?.id ? 'block' : 'hidden'}`}>
                            <p>
                                {item?.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Collapse;