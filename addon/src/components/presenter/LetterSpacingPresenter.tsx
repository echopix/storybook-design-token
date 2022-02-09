import React, { useMemo } from 'react';

import { styled } from '@storybook/theming';

import { Token } from '../../types/token.types';

interface LetterSpacingPresenterProps {
  token: Token;
}

export const LetterSpacingPresenter = ({ token }: LetterSpacingPresenterProps) => {
  const Box = useMemo(
    () =>
      styled.div(() => ({
        letterSpacing: token.value,
        width: '100%'
      })),
    [token]
  );

  return (
    <Box>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam veniam eum
      dicta.
    </Box>
  );
};
