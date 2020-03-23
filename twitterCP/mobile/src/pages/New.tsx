import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

type RootStackParamList = {
  Login: undefined;
  Timeline: undefined;
  New: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Timeline'
>;

interface IProps {
  navigation: LoginScreenNavigationProp;
}
export interface ITweet {
  author: string | null;
  content: string;
}

interface NewTweet {
  newTweet: string;
}

export default class New extends React.Component<IProps, NewTweet, ITweet> {
  public state: NewTweet;
  constructor(props: IProps) {
    super(props);
    this.state = {
      newTweet: '',
    };
    this.props.navigation.setOptions({ headerShown: false })
  }

  goBack = (): void => {
    this.props.navigation.pop()
  };

  handleNewTweet = async () => {
    const content = this.state.newTweet
    const author = await AsyncStorage.getItem('@GoTwitter:username')

    const newTweet:ITweet = {
      author,
      content,
    }
    await api.post<ITweet>('tweets', newTweet)

    this.goBack()
  };

  handleInputChange = (newTweet: string) => {
    this.setState({ newTweet });
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.goBack}>
            <Icon name="close" size={24} color="#4BB0EE" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handleNewTweet}>
            <Text style={styles.buttonText}>Tweetar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          multiline
          placeholder="O que está acontecendo?"
          value={this.state.newTweet}
          onChangeText={this.handleInputChange}
          placeholderTextColor="#999"
          returnKeyType="send"
          onSubmitEditing={this.handleNewTweet}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#4BB0EE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: '#333',
  },
});
