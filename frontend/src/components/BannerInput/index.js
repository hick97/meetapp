import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function BannerInput({ preview, file, handleChange }) {
  return (
    <Container>
      <figure>
        <label htmlFor="banner">
          <img src={preview} alt="" />

          <input
            type="file"
            id="banner"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
          />
          <figcaption>Selecionar imagem...</figcaption>
        </label>
      </figure>
    </Container>
  );
}

BannerInput.propTypes = {
  preview: PropTypes.string.isRequired,
  file: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
