import { useEffect, useState } from 'react';
import { generalRequest } from '../services/httpService';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';

const PostList = () => {
  //   const [posts, setPosts] = useState([]);

  const {
    loading,
    error,
    value: posts,
  } = useAsync(() => generalRequest('/posts'));
  //console.log(error?.message, 'error');

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const { data } = await generalRequest('/posts');
  //         setPosts(data);
  //         console.log(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1 className='error-msg'>{error?.message}</h1>;

  return (
    <div>
      {posts?.map((p) => (
        <h1 key={p.id}>
          <Link to={`/posts/${p.id}`}>{p.title}</Link>
        </h1>
      ))}
    </div>
  );
};

export default PostList;
