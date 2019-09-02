import React from 'react';

import { Container, Image } from './styles';

import logo from '../../assets/logo24x23.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
