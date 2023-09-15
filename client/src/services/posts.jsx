import { generalRequest } from './httpService';

export default getPosts = () => {
  return generalRequest('/posts');
};
