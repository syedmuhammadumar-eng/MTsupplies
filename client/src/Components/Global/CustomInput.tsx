interface inputProps {
    type: string,
    productLabel?: string,
    id: string,
    size?: string,
    textColor?: string,
    className?: string,
    checked?: boolean,
    onClick?(): void,
    onChange?(): void,
}
const CustomInput: React.FC<inputProps> = ({ type, productLabel, textColor, id, className, checked, onClick, onChange, size }) => {
    return (
        <div className="flex gap-2">
            <input className={`${className} cursor-pointer`} type={type} checked={checked} id={id} onClick={onClick} onChange={onChange} />
            <label className={`${textColor || 'text-gray-700'} ${size || 'text-lg'} cursor-pointer`} htmlFor={id}>{productLabel}</label>
        </div>
    )
}

export default CustomInput