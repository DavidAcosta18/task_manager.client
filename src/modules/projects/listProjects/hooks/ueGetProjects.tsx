import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Project } from '../../common/project.types';
import { apiAxiosInstance, type HttpError } from '../../../../api/config';

export type IGetProjectsListResponse = Project;

export const useGetProjects = () => {
  return useQuery<IGetProjectsListResponse[], HttpError>({
    queryFn: () =>
      apiAxiosInstance.get<IGetProjectsListResponse[]>(`/projects`).then(({ data }) => data),
    queryKey: ['GET_PROJECTS'],
  });
};

export const useInvalidateGetProjects = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['GET_PROJECTS'] });
};
