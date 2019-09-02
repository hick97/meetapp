import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyled: { padding: 30 },
})``;
