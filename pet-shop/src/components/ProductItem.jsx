import { assets } from '../assets/assets';

const ProductItem = ({ name, _id, price, image }) => {
  if (!_id || !name) return null;

  return (
    <div className="product-item">
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