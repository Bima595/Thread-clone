import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

function TalkInput({ addTalk }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function addtalk() {
    if (title.trim() && category.trim() && body.trim()) {
      addTalk({ title, body, category });
      setTitle('');
      setCategory('');
      setBody('');
    }
  }

  function handleTextChange(event) {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'category') {
      setCategory(value);
    } else if (name === 'body') {
      setBody(value);
    }
  }

  return (
    <div className="talk-input">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleTextChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={category}
        onChange={handleTextChange}
      />
      <textarea
        name="body"
        placeholder="What are you thinking?"
        value={body}
        onChange={handleTextChange}
      />
      <button type="button" onClick={addtalk}>Talk</button>
    </div>
  );
}

TalkInput.propTypes = {
  addTalk: PropTypes.func.isRequired,
};

export default TalkInput;