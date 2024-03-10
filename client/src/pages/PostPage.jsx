import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
  const { postSlug } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosts(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);
  if (loading)
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {posts && posts.title}
      </h1>
      <Link
        to={`/search?category=${posts && posts.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {posts && posts.category}
        </Button>
      </Link>
      <img
        src={posts && posts.image}
        alt={posts && posts.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2pxl text-xs ">
        <span>{posts && new Date(posts.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {posts && (posts.content.length / 1000).toFixed(0)}mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content "
        dangerouslySetInnerHTML={{ __html: posts && posts.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={posts._id} />
    </main>
  );
};

export default PostPage;
