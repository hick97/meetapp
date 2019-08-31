import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import logo from '../../assets/images/logo-header.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <nav>
            <img src={logo} alt="MeetApp" />
          </nav>
        </Link>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <button onClick={handleSignOut}>Sair</button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
