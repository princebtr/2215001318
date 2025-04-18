const PostCard = ({ post }) => {
  const randomImage = `https://picsum.photos/seed/${post.id}/300/200`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={randomImage} alt="post" className="rounded-md mb-2" />
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
};

export default PostCard;
