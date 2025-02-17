import { Link, useNavigate } from "react-router"
import logoblack from '../assets/logoblack.png';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import DangerToast from "../global/DangerToast";
import { useDispatch, useSelector } from "react-redux";
import { setLoginData, setToken } from "../redux/credentialReducer";
import { authService } from "../global/GeneralService";
import ResponsiveDialog from "../global/Modal";
import { resetCart } from "../redux/mtSupplies";
import { RootState } from "../store";
const LogIn = () => {
    const isAdmin = useSelector((state: RootState) => state.credentialReducer?.isAdmin);
    const [isPasswordIcon, setPasswordIcon] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openModal, setModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState<string>('');
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAdmin) {
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [isAdmin]);


    const handleChange = (field: string, value: string) => {
        const newFormState = { ...form, [field]: value };
        setForm(newFormState);
    };

    const handleLogin = () => {
        const payload = { ...form };

        authService('/user/login', payload)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    const respData = response?.data?.user;
                    const newRespData = { ...respData, isLoginSuccessFull: response?.data?.success, userId: response?.data?.user?._id };
                    dispatch(resetCart());
                    dispatch(setToken(response?.data?.token));
                    dispatch(setLoginData(newRespData));
                }
            })
            .catch(error => {
                setOpen(true);
                const errMsg = error?.response?.data?.message;
                setWarningMessage(errMsg);
            });
    };

    return (
        <>
            <ResponsiveDialog open={openModal} setOpen={setModalOpen} />
            <DangerToast
                open={open}
                setOpen={setOpen}
                warningMessage={warningMessage} />
            <div className="flex justify-between selection:bg-[#0082E7] selection:text-[#FFF]" >
                <div className="p-10 w-[20em]">
                    <Link to={'/'}>
                        <img src={logoblack} alt="MTSUPPLIES LOGO" />
                    </Link>
                </div>
            </div>
            <div className='mt-20 flex justify-center items-center selection:bg-[#0082E7] selection:text-[#FFF]' >
                <div className='w-[30em] h-[28em] p-10 rounded-3xl' >
                    <div className='text-4xl font-semibold text-center' >LogIn</div>
                    <div className='mt-10 text-xl font-medium' >Email</div>
                    <div className='mt-2' >
                        <input
                            className='w-[25em] border border-[#0082E7] border-r-0 border-t-0 border-l-0 p-2 outline-none font-medium'
                            type='text'
                            placeholder='Enter your Email'
                            value={form?.email}
                            onChange={(event) => handleChange('email', event.target.value)}
                        />
                    </div>
                    <div className='mt-5 flex justify-between items-center' >
                        <div className="text-xl font-medium" >Password</div>
                        <div
                            onClick={() => setModalOpen(true)}
                            className="font-medium text-base text-[#0082E7] cursor-pointer hover:underline">forget password?</div>
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
                            onClick={handleLogin}
                        >
                            Log In</button>
                    </div>
                    <div className="mt-5 font-medium text-center" >Already have an Account ? <span className="text-[#0082E7] cursor-pointer"><Link to={'/Signup'} className="hover:underline">Sign Up Now</Link></span></div>
                </div>
            </div>
        </>
    );
};

export default LogIn;