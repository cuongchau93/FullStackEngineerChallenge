import styled from 'styled-components/macro';

export const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${p => p.theme.textSecondary};
  ${p =>
    p.style
      ? `
  text-align: p.style.textAlign;
  color: p.style.color;
  `
      : ''};
  margin: 0.625rem 0 1.5rem 0;
`;
