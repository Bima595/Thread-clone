import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

function TalkInput({ addTalk }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function addtalk() {
    if (title.trim() && category.trim() && body.trim()) {
      addTalk({ title, category, body });
      setTitle('');
      setCategory('');
      setBody('');
    }
  }

  function handleTextChange({ target }) {
    if (target.name === 'title' && target.value.length <= 100) {
      setTitle(target.value);
    } else if (target.name === 'category') {
      setCategory(target.value);
    } else if (target.name === 'body' && target.value.length <= 320) {
      setBody(target.value);
    }
  }

  return (
    <div className="talk-input">
      <input type="text" name="title" placeholder="Title" value={title} onChange={handleTextChange} />
      <input type="text" name="category" placeholder="Category" value={category} onChange={handleTextChange} />
      <textarea name="body" placeholder="What are you thinking?" value={body} onChange={handleTextChange} />
      <p className="talk-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <button type="submit" onClick={addtalk}>Talk</button>
    </div>
  );
}

TalkInput.propTypes = {
  addTalk: PropTypes.func.isRequired,
};

export default TalkInput;
