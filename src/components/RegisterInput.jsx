import 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onIdChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="register-input">
      <input type="text" value={name} onChange={onNameChange} placeholder="Name" />
      <input type="email" value={email} onChange={onIdChange} placeholder="Email" />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button type="button" onClick={() => register({ name, email, password })}>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
