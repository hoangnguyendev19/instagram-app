import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabBarFollow from '../components/TabBarFollow';
import Search from '../components/Search';
import Follow from '../components/Follow';
import { useSelector } from 'react-redux';

const TopTab = createMaterialTopTabNavigator();

const FollowScreen = ({ navigation, route }) => {
  const { initialRouteName } = route.params;
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '15px',
          paddingHorizontal: '15px',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: '25px',
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: 'auto',
          }}
        >
          {currentUser?.userName}
        </Text>
      </View>
      <TopTab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBarFollow {...props} />}
        initialRouteName={initialRouteName}
        style={{ marginTop: '20px' }}
      >
        <TopTab.Screen name="Follower" component={FollowerList} />
        <TopTab.Screen name="Following" component={FollowingList} />
      </TopTab.Navigator>
    </View>
  );
};

const FollowerList = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <ScrollView style={{ marginTop: '15px' }}>
      <Search />
      <View style={{ paddingHorizontal: '15px' }}>
        {currentUser &&
          currentUser?.followers?.length > 0 &&
          currentUser?.followers?.map((user) => <Follow name="Follower" user={user} />)}
      </View>
    </ScrollView>
  );
};

const FollowingList = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <ScrollView style={{ marginTop: '15px' }}>
      <Search />
      <View style={{ paddingHorizontal: '15px' }}>
        {currentUser &&
          currentUser?.following?.length > 0 &&
          currentUser?.following?.map((user) => <Follow user={user} />)}
      </View>
    </ScrollView>
  );
};

export default FollowScreen;
