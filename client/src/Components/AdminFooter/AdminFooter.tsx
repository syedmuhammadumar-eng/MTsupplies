import { AiOutlineCopyright } from "react-icons/ai";
const AdminFooter = () => {
  return (
    <div className="footer flex justify-between p-8">
      <span className="font-semibold text-mainBg" >MT Supplies</span>
      <span><div className="flex items-center text-sm text-mainBg"><AiOutlineCopyright /> Mt Supplies Admin Panel</div></span>
    </div>
  );
};

export default AdminFooter;