import one1 from '../../assets/logos/one1.png';
import one2 from '../../assets/logos/one2.png';
import one3 from '../../assets/logos/one3.png';
import one4 from '../../assets/logos/one4.png';
import one5 from '../../assets/logos/one5.png';
import one6 from '../../assets/logos/one6.png';
// 1753
const Brand = () => {
    return (
        <div className="flex flex-row justify-center py-10 px-10 flex-wrap lgl:flex-nowrap">
            <div className="border"> <img src={one1} alt="Stabilo" className="" /></div>
            <div className="border"> <img src={one2} alt="Legami" className="" /></div>
            <div className="border"> <img src={one3} alt="Ranger" className="" /></div>
            <div className="border"> <img src={one4} alt="Moleskine" className="" /></div>
            <div className="border"> <img src={one5} alt="Parker" className="" /></div>
            <div className="border"> <img src={one6} alt="Parker" className="" /></div>
        </div>
    )
}

export default Brand