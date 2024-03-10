import { Alert, Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: comment,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setLoading(false);
      }
    } catch (error) {
      setCommentError(error.message);
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className=" flex items-center gap-1 my-5 text-gray-500 text-sm ">
          <p>Signed in as:</p>

          <img
            className="h-5 w-5 object-cover rounded-full "
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            You must be signed in to comment
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment .... "
            rows={"3"}
            maxLength={"200"}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm mt-3">
              {200 - comment.length} characters remaing
            </p>
            <Button
              outline
              gradientDuoTone={"purpleToBlue"}
              className="mt-4"
              type="submit"
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color={"failure"} className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
    </div>
  );
};

export default CommentSection;
