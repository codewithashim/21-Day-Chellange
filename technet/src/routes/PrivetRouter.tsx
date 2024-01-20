/* eslint-disable react-hooks/rules-of-hooks */
import { useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: ReactNode;
}

const PrivetRouter = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivetRouter;
