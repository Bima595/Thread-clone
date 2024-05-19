// RegisterInput.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';
import RegisterInput from '../components/RegisterInput';

export default {
  title: 'RegisterInput',
  component: RegisterInput,
};

export const Success = () => <RegisterInput register={action('Register successful')} />;

export const Error = () => (
  <RegisterInput
    register={() => {
      throw new Error('Registration failed');
    }}
  />
);
