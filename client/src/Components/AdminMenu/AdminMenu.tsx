import { Link } from "react-router";
import { menu } from '../../data';
const AdminMenu = () => {
    return (
        <div className="menu">
            {menu && menu.map((item) => (
                <div className="item flex flex-col gap-2 mb-5" key={item.id}>
                    {item.listItems.map(listItem => (
                        <Link to={listItem.url} className="flex items-center gap-3 p-2 hover:bg-mainColor rounded" key={listItem.id}>
                            {listItem.icon}
                            <span className="listItemTitle lg:block md:hidden sm:hidden text-mainBg">{listItem.title}</span>
                        </Link>
                    ))}

                </div>
            ))}
        </div>
    );
};

export default AdminMenu;