import * as React from 'react';
import styled from 'styled-components/macro';
import PayPayIcon from './assets/paypay-icon.png';

export function Logo() {
  return (
    <Wrapper>
      <Img src={PayPayIcon} alt="react-boilerplate - Logo" />
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
