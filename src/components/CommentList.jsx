import Comment from './Comment';

const CommentList = ({ comments }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment comment={comment} />
      <hr className="border-none h-[2px] bg-slate-100 my-2 mx-auto" />
      {comment.replies.length > 0 && (
        <div className="border-slate-200 border-l-2 pl-5 ml-5">
          <CommentList comments={comment.replies} />
        </div>
      )}
    </div>
  ));
};

export default CommentList;
