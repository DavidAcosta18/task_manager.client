import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { IUser } from '../../../types/user.interfaces';
import { apiAxiosInstance, type HttpError } from '../../../api/config';

export type IGetUserListResponse = IUser;

export const useGetUserList = () => {
  return useQuery<IGetUserListResponse[], HttpError>({
    queryFn: () => apiAxiosInstance.get<IGetUserListResponse[]>(`/users`).then(({ data }) => data),
    queryKey: ['users'],
  });
};

export const useInvalidateUserList = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['users'] });
};
