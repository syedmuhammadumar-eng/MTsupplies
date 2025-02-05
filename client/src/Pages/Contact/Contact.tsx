import { useState } from 'react';
import contactImg from '../../assets/ftwo.jpg';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Button from '@mui/material/Button';
import { authService } from '../../global/GeneralService';
import SuccessToast from '../../global/SuccessToast';
const Contact = () => {

    const [form, setForm] = useState({
        name: '',
        email: '',
        textMessage: '',
    })

    const [successToast, setSuccessToast] = useState({
        isSuccess: false,
        successMessage: '',
    })

    const handleUpdateForm = (field: string, value: string) => {
        const newFormState = { ...form, [field]: value };
        setForm(newFormState);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            name: form?.name,
            number: '12345678921',
            email: form?.email,
            message: form?.textMessage,
        };

        authService('/form/contact-submit', payload)
            .then((response) => {
                if (response.data.success) {
                    if ( response.data.message) {
                        setSuccessToast({ isSuccess: true, successMessage: response?.data?.message });
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })

        // setIsFormSubmitted({
        //     content: 'Your Response Has Been Submitted SuccessFully.<br /> We\'ll get back to you shortly.',
        //     isSubmit: true,
        // });
    };

    return (
        <>
            <SuccessToast open={successToast.isSuccess} setOpen={setSuccessToast} warningMessage={successToast?.successMessage} />
            <Header />
            <div className="min-h-screen flex justify-center items-center px-10" >
                <div className="lg:block md:block sm:hidden"><img src={contactImg} alt="contact" className=' shadow-xl opacity-80 lg:w-[20rem] md:w-[20rem] h-[40rem] object-cover' /></div>
                <div className="bg-gradient-to-b from-[#0082E7] to-[#0053A5] p-2 w-[40rem] h-[40rem] shadow-xl text-[#FFF]" >
                    <div className='text-center lg:text-4xl md:text-3xl sm:text-2xl font-medium p-2 mt-20'>Get In Touch With Us</div>
                    <form className='p-10 place-self-center' onSubmit={(e) => handleSubmit(e)} >
                        <div className='lg:text-lg sm:text-base font-medium'>Name</div>
                        <div className='mt-2'>
                            <input
                                required
                                type="text"
                                className='text-sm w-[20rem] p-2 outline-none text-[#000] rounded-sm'
                                placeholder="Enter Full Name"
                                value={form?.name}
                                onChange={(event) => handleUpdateForm('name', event?.target.value)}
                                maxLength={20}
                            />
                        </div>
                        <div className='lg:text-lg sm:text-base font-medium mt-2' >Email</div>
                        <div className='mt-2'>
                            <input
                                required
                                type="email"
                                className='text-sm w-[20rem] p-2 outline-none text-[#000] rounded-sm'
                                placeholder="Enter Enter Email Address"
                                value={form?.email}
                                onChange={(event) => handleUpdateForm('email', event?.target.value)}
                            />
                        </div>
                        <div className='lg:text-lg sm:text-base font-medium mt-2' >Message</div>
                        <div className='text-xl font-medium mt-2' >
                            <textarea
                                required
                                style={{ minHeight: '3rem', maxHeight: '10rem', minWidth: '20rem', maxWidth: '20rem' }}
                                className='resize rounded-sm text-sm w-[20rem] p-2 outline-none text-[#000]'
                                placeholder="Type Your Message Here"
                                value={form?.textMessage}
                                onChange={(event) => handleUpdateForm('textMessage', event?.target.value)}
                            />
                        </div>
                        <div className='mt-2' >
                            <Button
                                type='submit'
                                variant='outlined'
                                color='primary'
                                className='w-[20rem] text-center rounded-md p-3 font-titleFont outline-none up'
                                style={{ borderColor: 'white', color: 'white' }}
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;