/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetCommentQuery,
  usePostCommentMutation,
} from '@/redux/features/products/productApi';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  console.log(inputValue);

  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 20000,
  });

  const [postComment, { isLoading, isError }] = usePostCommentMutation();
  console.log(isLoading, isError);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const opctions = {
      id: id,
      data: {
        comment: inputValue,
      },
    };
    postComment(opctions);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="mx-auto mt-5 max-w-7xl">
      <form className="flex items-center gap-5" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
