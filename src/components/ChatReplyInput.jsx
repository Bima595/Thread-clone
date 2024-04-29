import { useState } from "react";
import PropTypes from 'prop-types';
function ChatReplyInput({ replyTalk }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    replyTalk(newComment);
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment..."
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}

ChatReplyInput.propTypes = {
  replyTalk: PropTypes.func.isRequired,
};
export default ChatReplyInput;
