import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  figure {
    position: relative;
  }
  figcaption {
    position: absolute;
    width: 940px;
    font-size: 20px;
    font-weight: bold;
    line-height: 300px;
    text-align: center;
    left: 0;
    top: 0;
    text-shadow: 0 0 1px white;
    font-weight: bold;
    opacity: 0.5;
  }

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
      width: 940px;
      background: rgba(0, 0, 0, 0.3);
    }

    input {
      display: none;
    }
  }
`;
