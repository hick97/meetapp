import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  padding: 10px 30px;
`;
export const Title = styled.View`
  flex-direction: row;
  font-weight: bold;
  align-self: center;
  margin-bottom: 50px;
`;
export const CurrentDate = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin: 0 15px;
`;
export const ChevronIcon = styled(Icon)`
  color: #fff;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyled: { padding: 30 },
})``;
