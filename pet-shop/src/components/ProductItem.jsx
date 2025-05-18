import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ name, _id, price, image }) => {
  const navigate = useNavigate();
  
  if (!_id || !name) return null;

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="product-item cursor-pointer transition-transform duration-300 hover:scale-105" onClick={handleClick}>
      <img 
        className='product_image'
        src={image || assets.placeholder} 
        alt={name}
        onError={(e) => e.target.src = assets.placeholder}
      />
      <h3>{name}</h3>
      <p className='text-lg font-semibold text-orange-700'>{price} ₴</p>
    </div>
  );
};

export default ProductItem;