import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  ul {
    margin-top: 40px;
  }
`;

export const ContentHeader = styled.div`
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 172px;
    font-weight: bold;
    font-size: 16px;
    background: #f94d6a;
    height: 42px;
    border: none;
    border-radius: 4px;
    color: #ffffff;
  }
`;

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 40px 20px 20px;
  margin-top: 8px;
  color: #ffffff !important;
  cursor: pointer;

  strong {
    font-size: 18px;
  }
  span {
    font-size: 16px;
    color: #999;
  }
`;
