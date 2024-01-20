/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useSingleProductQuery } from '@/redux/features/products/productApi';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useSingleProductQuery(id);
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };

  if (isLoading)
    return (
      <p className="flex items-center justify-center h-screen py-40 text-2xl">
        Loading...
      </p>
    );

  return (
    <>
      <div className="flex items-center mx-auto border-b border-gray-300 max-w-7xl">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button onClick={() => handleAddProduct(product)}>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id!} />
    </>
  );
}
