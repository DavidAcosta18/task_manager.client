import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiAxiosInstance } from '../../../api/config';

export const useGetProjectsTasks = (projectId: string) => {
  return useQuery({
    queryFn: () =>
      apiAxiosInstance.get(`/tasks/projects/${projectId}`).then(({ data }) => data.tasks),
    queryKey: ['GET_PROJECT_TASKS'],
  });
};

export const useInvalidateProjectsTasks = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['GET_PROJECT_TASKS'] });
};
