import { Link, useNavigate } from "react-router";
import logoblack from '../../assets/logoblack.png';
import { useState } from "react";
import { authService } from "../../global/GeneralService";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import DangerToast from "../../global/DangerToast";
import SuccessToast from "../../global/SuccessToast";

const SignUp = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [isPasswordIcon, setPasswordIcon] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [SuccessOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (field: string, value: string) => {
        const newFormState = { ...form, [field]: value };
        setForm(newFormState);
    };

    const handleSignUp = () => {
        const payload = { ...form };

        authService('/user/register', payload)
            .then(response => {
                console.log(response);
                // if (response)
                if (response.status === 200) {
                    const respMsg = response.data.message;
                    if (respMsg.includes('Signed Up Successfully.')) {
                        setSuccessOpen(true);
                        setSuccessMessage(respMsg);
                        setTimeout(() => {
                            navigate('/Login');
                        }, 1000);
                    }
                    else if (respMsg) {
                        setOpen(true);
                        setWarningMessage(respMsg);
                    }

                }
            })
            .catch(error => {
                setOpen(true);
                console.log(error);
            });
    };

    return (
        <>
            <DangerToast
                open={open}
                setOpen={setOpen}
                warningMessage={warningMessage}
            />
            <SuccessToast
                open={SuccessOpen}
                setOpen={setSuccessOpen}
                warningMessage={successMessage}
            />
            <div className="flex justify-between selection:bg-[#0082E7] selection:text-[#FFF]" >
                <div className="p-10 w-[20em]">
                    <Link to={'/'}>
                        <img src={logoblack} alt="MTSUPPLIES LOGO" />
                    </Link>
                </div>
            </div>
            <div className='flex justify-center items-center selection:bg-[#0082E7] selection:text-[#FFF]' >
                <div className='w-[30em] h-[28em] p-10 rounded-3xl' >
                    <div className='text-4xl font-semibold text-center' >Sign Up</div>

                    <div className='mt-5 text-xl font-medium' >Name</div>
                    <div className='mt-2' >
                        <input
                            className='w-[25em] border border-[#0082E7] border-r-0 border-t-0 border-l-0 p-2 font-medium outline-none'
                            type='text'
                            placeholder='Enter Name'
                            value={form?.name}
                            onChange={(event) => handleChange('name', event.target.value)}
                        />
                    </div>

                    <div className='mt-5 text-xl font-medium' >Email</div>
                    <div className='mt-2' >
                        <input
                            className='w-[25em] border border-[#0082E7] border-r-0 border-t-0 border-l-0 p-2 font-medium outline-none'
                            type='text'
                            placeholder='Enter Email Address'
                            value={form?.email}
                            onChange={(event) => handleChange('email', event.target.value)}
                        />
                    </div>

                    <div className='mt-5 flex justify-between items-center' >
                        <div className="text-xl font-medium" >Password</div>
                    </div>

                    <div className='mt-2' >
                        <div className="relative w-[25em]">
                            <span className="absolute inset-y-0 right-2 flex items-center text-[#0082E7]"
                                onMouseDown={() => setPasswordIcon(true)}
                                onMouseUp={() => setPasswordIcon(false)}
                                onMouseLeave={() => setPasswordIcon(false)}
                            >
                                {isPasswordIcon ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </span>
                            <input
                                className="w-full p-2 border border-[#0082E7] border-r-0 border-t-0 border-l-0 outline-none"
                                type={isPasswordIcon ? "text" : "password"}
                                placeholder="Enter your Password"
                                value={form?.password}
                                onChange={(event) => handleChange('password', event.target.value)}
                            />
                        </div>
                    </div>

                    <div className='mt-20' >
                        <button
                            className='w-[25em] bg-[#0082E7] hover:bg-[#0082E7] p-4 text-[#FFF] hover:text-[#FFF] font-semibold rounded-md hover:shadow-xl'
                            onClick={() => handleSignUp()}
                        >Sign Up</button>
                    </div>
                    <div className="mt-5 font-medium text-center" >Don't Have an Account ? <span className="text-[#0082E7] cursor-pointer"><Link to={'/Login'} className="hover:underline" >Create New Account</Link></span></div>
                </div>
            </div>
        </>
    );
};

export default SignUp;