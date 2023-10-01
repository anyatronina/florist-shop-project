import React, { useEffect } from "react";
import { orderBy } from "lodash";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { itemId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(itemId));
  }, [itemId]);

  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: itemId }));
  };

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <div className="d-flex flex-column container container-fix w-30">
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Отзывы</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "loading..."
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
