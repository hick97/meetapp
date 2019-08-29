import styled from 'styled-components';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;
`;

export const ContentHeader = styled.div`
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button:first-child {
    background: #4dbaf9;
    margin-right: 10px;
  }

  button {
    width: 116px;
    font-weight: bold;
    font-size: 16px;
    background: #f94d6a;
    height: 42px;
    border: none;
    border-radius: 4px;
    color: #ffffff;
  }
`;

export const Content = styled.div`
  margin-top: 40px;
  max-width: 940px;

  img {
    width: 940px;
    max-height: 300px;
  }
  p {
    margin-top: 15px;
    font-size: 18px;
    text-align: justify;
  }
`;

export const ContentFooter = styled.div`
  max-width: 940px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  span {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }
`;
