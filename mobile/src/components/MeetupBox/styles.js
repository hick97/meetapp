import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
`;
export const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;
export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
export const Title = styled.Text`
  color: #333333;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #999999;
  margin-left: 5px;
`;
export const Location = styled.View`
  margin: 5px 0;
  flex: 1;
  flex-direction: row;
`;
export const Date = styled.View`
  margin: 5px 0;
  flex: 1;
  flex-direction: row;
`;
export const Organizer = styled.View`
  margin: 5px 0;
  flex-direction: row;
  flex: 1;
`;
export const Info = styled.View`
  padding: 20px;
`;
export const InfoIcon = styled(Icon)`
  color: #999999;
`;
export const InscriptionButton = styled.TouchableOpacity`
  margin-top: 10px;
  height: 46px;
  background: #f94d6a;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;
