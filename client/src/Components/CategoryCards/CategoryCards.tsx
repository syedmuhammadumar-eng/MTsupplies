import Card from './Card';
const CategoryCards = ({ category }) => {
	return (
		<>
			<div className="flex justify-center gap-10 mt-8 py-8 flex-wrap">
				{category && category?.map((item, index) => (
					<div key={index} ><Card {...item} /></div> 
				))}
			</div>
		</>

	)
}

export default CategoryCards