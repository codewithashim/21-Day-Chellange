import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useGetProductsQuery } from '@/redux/features/products/productApi';
import {
  setPriceRange,
  toggleState,
} from '@/redux/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';

export default function Products() {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const { priceRange, status } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRange(value[0]));
  };

  let productsData;

  if (status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data?.data?.filter(
      (item: { price: number }) => item.price < priceRange
    );
  } else {
    productsData = data?.data;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen py-40 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-12 mx-auto max-w-7xl ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div
            onClick={() => dispatch(toggleState())}
            className="flex items-center mt-3 space-x-2"
          >
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="grid grid-cols-3 col-span-9 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
