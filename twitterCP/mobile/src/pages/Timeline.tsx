import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

import api from '../services/api';

import Icon from 'react-native-vector-icons/MaterialIcons';

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

interface ITimeline {
  tweets: ITweet[];
  newTweet: string;
}

interface ITweet {
  _id: string;
  author: string;
  content: string;
  likes: Number;
  createdAt: Date;
}

export default class Timeline extends Component<IProps, ITimeline> {
  public state: ITimeline;
  public props: IProps;

  constructor(props: IProps) {
    super(props);
    this.props = props;
    this.state = {
      tweets: [],
      newTweet: '',
    };
  }

  async componentDidMount() {
    this.subscribeToEvents()

    const { navigation } = this.props;
    this.props.navigation.setOptions({
      title: 'Início',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('New')}>
          <Icon
            style={{ marginRight: 20 }}
            name="add-circle-outline"
            size={24}
            color="#4BB0EE"
          />
        </TouchableOpacity>
      ),
    });
    const response = await api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = (): void => {
    const io = socket('http://10.0.2.2:3000');

    io.on('tweet', (data: ITweet) => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like', (data: ITweet) => {
      this.setState({
        tweets: this.state.tweets.map((tweet) =>
          tweet._id === data._id ? data : tweet
        ),
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={(tweet) => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
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
});
