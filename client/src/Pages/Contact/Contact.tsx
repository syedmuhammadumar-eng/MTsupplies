import { useState } from 'react';
import contactImg from '../../assets/ftwo.jpg';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { Button } from '@material-tailwind/react';
const Contact = () => {
    const [value, setValue] = useState('');
    const [content, setContent] = useState('');
    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        setContent('Your Response Has Been Submitted SuccessFully.<br /> We\'ll get back to you shortly.')
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center mt-10 px-10" >
                <div className="lg:block md:block sm:hidden"><img src={contactImg} alt="contact" className=' shadow-xl opacity-80 lg:w-[20rem] md:w-[20rem] h-[40rem] object-cover' /></div>
                <div className="bg-gradient-to-b from-[#0082E7] to-[#0053A5] p-2 w-[40rem] h-[40rem] shadow-xl text-[#FFF]" >
                    <div className='text-center lg:text-4xl md:text-3xl sm:text-2xl font-semibold p-2 mt-20'>Get In Touch With Us</div>
                    {!content ? (
                        <div className='p-10 place-self-center'>
                            <div className='lg:text-xl sm:text-base font-medium'>Name</div>
                            <div className='mt-2'><input className='text-sm w-[20rem] p-2 outline-none text-[#000] rounded-md' type="text" placeholder="Enter Full Name" /></div>
                            <div className='lg:text-xl sm:text-base font-medium mt-2' >Email</div>
                            <div className='mt-2'><input className='text-sm w-[20rem] p-2 outline-none text-[#000] rounded-md' type="text" placeholder="Enter Enter Email Address" /></div>
                            <div className='lg:text-xl sm:text-base font-medium mt-2' >Message</div>
                            <div className='text-xl font-medium mt-2' >
                                <textarea
                                    className='resize rounded-md text-sm w-[20rem] p-2 outline-none text-[#000]'
                                    placeholder="Type Your Message Here"
                                    value={value}
                                    onInput={handleInput}
                                    style={{ minHeight: '3rem', maxHeight: '10rem', minWidth: '20rem', maxWidth: '20rem' }}
                                />
                            </div>
                            <div className='' >
                                <Button
                                    className='mt-2 border w-[20rem] text-center rounded-md p-3 bg-[#005fb6] font-titleFont outline-none'
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    onClick={handleClick}
                                >Send Message</Button></div>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center text-xl mt-40 font-medium' dangerouslySetInnerHTML={{ __html: content }} />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;