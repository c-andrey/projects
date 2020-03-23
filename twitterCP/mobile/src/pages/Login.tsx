import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from 'react-navigation';
import {
  NavigationState,
  CommonActions,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface IUser {
  username: string;
}

type RootStackParamList = {
  Login: undefined;
  Timeline: undefined;
  New: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

// type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

export default class Login extends Component<Props, IUser> {
  public state: IUser;
  public props: Props;
  public static navigationOptions = {
    header: null,
  };
  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      username: '',
    };
  }

  async componentDidMount() {
    AsyncStorage.clear()
    const username = await AsyncStorage.getItem('@GoTwitter:username');

    if (username) {
      this.navigateToTimeline();
    }
  }

  navigateToTimeline = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Timeline' }],
    });

    this.props.navigation.dispatch(resetAction);
  };

  handleLogin = async () => {
    const { username } = this.state;

    if (!username.length) return;

    await AsyncStorage.setItem('@GoTwitter:username', username);

    this.navigateToTimeline();
  };

  handleInputChange = (username: string): void => {
    this.setState({ username });
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <Icon name="twitter" size={64} color="#4BB0EE" />
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={this.state.username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30,
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
