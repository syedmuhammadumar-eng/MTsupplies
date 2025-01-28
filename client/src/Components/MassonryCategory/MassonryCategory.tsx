import fountainpain from '../../assets/category6/diaries.png';
import notebooks from '../../assets/category6/notebooks.png';
import alcohalinks from '../../assets/category6/alcohalinks.png';
import inkpads from '../../assets/category6/inkpads.png';
import { useNavigate } from 'react-router';
const MassonryCategory = () => {
	const navigate = useNavigate();
	const handleNavigation = () => {
		navigate('/shop')
	};
	return (
		<div className='flex justify-center gap-2 flex-wrap mt-20 overflow-hidden'>
			<div className='flex flex-col items-center gap-2'>
				<div className='relative'>
					<label className='absolute bottom-24 left-10 font-semibold text-white text-xl'>Fountain Pens</label>
					<button className='absolute bottom-10 left-10 bg-white p-3 font-medium text-sm w-[8rem]' onClick={handleNavigation} >Shop Now</button>
					<img className="h-40 lg:w-80 md:w-96 sm:w-96 rounded-sm" src={fountainpain} alt="fountain pen" />
				</div>
				<div>
					<div className='relative'>
						<label className='absolute bottom-24 left-10 font-semibold text-white text-xl'>Diaries</label>
						<button className='absolute bottom-10 left-10 bg-blue-600 text-white p-3 font-medium text-sm w-[8rem]' onClick={handleNavigation} >Learn More</button>
						<img className="h-40 lg:w-80 md:w-96 sm:w-96 rounded-sm" src={fountainpain} alt="fountain pen" />
					</div>
				</div>
			</div>
			<div>
				<div className='relative'>
					<label className='absolute top-7 left-10 font-semibold text-white text-xl'>Notebooks</label>
					<button className='absolute top-20 left-10 bg-blue-600 text-white p-3 font-medium text-sm w-[8rem]' onClick={handleNavigation} >Learn More</button>
					<img src={notebooks} alt="notebooks" className="h-80 lg:w-full sm:w-96 rounded-sm" />
				</div>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<div>
					<div className='relative'>
						<label className='absolute bottom-24 left-10 font-semibold text-white text-xl'>Alcohol Inks</label>
						<button className='absolute bottom-10 left-10 bg-blue-600 text-white p-3 font-medium text-sm w-[8rem]' onClick={handleNavigation} >Buy Now</button>
						<img className="h-40 lg:w-80 md:w-96 sm:w-96 rounded-sm" src={alcohalinks} alt="alcohalinks" />
					</div>
				</div>
				<div>
					<div className='relative'>
						<label className='absolute bottom-24 left-10 font-semibold text-white text-xl'>Versafine Clair inkpads</label>
						<button className='absolute bottom-10 left-10 bg-blue-600 text-white p-3 font-medium text-sm w-[8rem]' onClick={handleNavigation} >Buy Now</button>
						<img className="h-40 lg:w-80 md:w-96 sm:w-96 rounded-sm" src={inkpads} alt="inkpads" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MassonryCategory