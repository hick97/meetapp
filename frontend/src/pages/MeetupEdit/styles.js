import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;

  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #f94d6a !important;
      margin-bottom: 5px;
    }

    textarea {
      min-height: 200px !important;
      background: rgba(0, 0, 0, 0.1);
      border: none;
      margin-bottom: 10px;
      font-weight: 400;
      font-size: 16px;
      padding: 15px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    label {
      color: #fff;
    }
    button {
      color: #fff;
    }

    .MuiFormControl-root {
      margin-right: 30px;
    }

    .submit {
      button {
        align-items: right;
        margin: 10px 0 0;
        width: 162px;
        height: 42px;
        background: #f94d6a;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.08, '#f94d6a')};
        }
      }
    }
  }
`;
