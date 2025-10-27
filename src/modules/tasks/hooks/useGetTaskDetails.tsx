import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiAxiosInstance } from '../../../api/config';

export const useGetTaskDetails = (taskID: string) => {
  return useQuery({
    queryFn: () => apiAxiosInstance.get(`/tasks/${taskID}`).then(({ data }) => data),
    queryKey: ['GET_TASK_DETAILS'],
  });
};

export const useInvalidateGetTaskDetails = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['GET_TASK_DETAILS'] });
};
