import  'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatReplyInput from './ChatReplyInput';
import {
    describe, test, expect,vi
  } from 'vitest';

describe('ChatReplyInput component', () => {
  test('renders textarea and submit button', () => {
    render(<ChatReplyInput replyTalk={() => {}} />);
    const textarea = screen.getByPlaceholderText('Write your comment...');
    expect(textarea).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  test('calls replyTalk with new comment when form is submitted', () => {
    const mockReplyTalk = vi.fn();
    render(<ChatReplyInput replyTalk={mockReplyTalk} />);
    const textarea = screen.getByPlaceholderText('Write your comment...');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const comment = 'This is a test comment';
    fireEvent.change(textarea, { target: { value: comment } });
    fireEvent.click(submitButton);

    expect(mockReplyTalk).toHaveBeenCalledWith(comment);
  });

  test('does not call replyTalk when form is submitted with empty comment', () => {
    const mockReplyTalk = vi.fn();
    render(<ChatReplyInput replyTalk={mockReplyTalk} />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.click(submitButton);

    expect(mockReplyTalk).not.toHaveBeenCalled();
  });

  test('clears textarea after form is submitted', () => {
    const mockReplyTalk = vi.fn();
    render(<ChatReplyInput replyTalk={mockReplyTalk} />);
    const textarea = screen.getByPlaceholderText('Write your comment...');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const comment = 'This is a test comment';
    fireEvent.change(textarea, { target: { value: comment } });
    fireEvent.click(submitButton);

    expect(textarea).toHaveValue('');
  });
});
