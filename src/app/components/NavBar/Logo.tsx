import * as React from 'react';
import styled from 'styled-components/macro';
import PayPayIcon from './assets/paypay-icon.png';

export function Logo() {
  return (
    <Wrapper>
      <Img src={PayPayIcon} alt="react-boilerplate - Logo" />
      <Title>Feedback Management</Title>
    </Wrapper>
  );
}

const Img = styled.img`
  width: 30%;
  display: inline;
`;

export default Img;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
`;
