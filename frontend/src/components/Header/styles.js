import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #000000;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      margin-left: 20px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #ffffff;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #999;
    }
  }
  button {
    background: #d44059;
    width: 71px;
    height: 42px;
    border-radius: 4px;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    border: none;

    &:hover {
      background: ${darken(0.08, '#f94d6a')};
    }
  }
`;
