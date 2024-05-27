import { ScrollView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TabBarProfile from '../components/TabBarProfile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostBanner from '../components/PostBanner';
import { Avatar, Menu } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { useState, useEffect } from 'react';
import { getAllPostsForUser } from '../store/post/postForUserSlice';

const TopTab = createMaterialTopTabNavigator();

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.postForUser);

  useEffect(() => {
    dispatch(getAllPostsForUser(currentUser.id));
  }, []);

  const signout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: '15px',
          alignItems: 'center',
          paddingHorizontal: '15px',
        }}
      >
        <Text style={{ fontSize: '24px', fontWeight: 'bold', marginRight: 'auto' }}>
          {currentUser?.userName}
        </Text>
        <TouchableOpacity style={{ marginRight: '25px' }}>
          <Icon name="plus-square" size={24} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name="bars" size={24} />
              </TouchableOpacity>
            }
            style={{ paddingTop: 40 }}
          >
            <Menu.Item onPress={signout} title="Đăng xuất" leadingIcon="logout" />
          </Menu>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: '15px',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '15px',
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Avatar.Image source={currentUser?.avatarUrl} size={80} />
            <Text
              style={{ fontSize: '16px', color: 'black', fontWeight: 'bold', marginTop: '5px' }}
            >
              {currentUser?.userName}
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginLeft: '10px' }}>
            <Text style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
              {posts?.length}
            </Text>
            <Text style={{ fontSize: '16px', color: 'black', fontWeight: '400' }}>Bài viết</Text>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center', marginLeft: '10px' }}
            onPress={() => navigation.navigate('Follow', { initialRouteName: 'Follower' })}
          >
            <Text style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
              {currentUser?.followers?.length}
            </Text>
            <Text style={{ fontSize: '16px', color: 'black', fontWeight: '400' }}>
              Người the...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center', marginLeft: '10px' }}
            onPress={() => navigation.navigate('Follow', { initialRouteName: 'Following' })}
          >
            <Text style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
              {currentUser?.following?.length}
            </Text>
            <Text style={{ fontSize: '16px', color: 'black', fontWeight: '400' }}>Đang the...</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: '15px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '15px',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              paddingHorizontal: '5px',
              paddingVertical: '5px',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
            }}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Chỉnh sửa trang cá...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              paddingHorizontal: '5px',
              paddingVertical: '5px',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
            }}
          >
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Chia sẻ trang cá nh...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.1)',
              paddingHorizontal: '5px',
              paddingVertical: '5px',
              borderRadius: '5px',
            }}
          >
            <Icon name="user-plus" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <TopTab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <TabBarProfile {...props} />}
          initialRouteName="PostList"
        >
          <TopTab.Screen name="PostList" component={PostList} />
          <TopTab.Screen name="FriendList" component={FriendList} />
        </TopTab.Navigator>
      </ScrollView>
    </View>
  );
};

const PostList = ({ navigation }) => {
  const { posts } = useSelector((state) => state.postForUser);

  const renderPostRow = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}
    >
      {item.map((post) => (
        <PostBanner key={post.id} navigation={navigation} post={post} />
      ))}
    </View>
  );

  return (
    <ScrollView>
      <FlatList
        data={chunkArray(posts, 3)}
        renderItem={renderPostRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};
const FriendList = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 'bold', fontSize: '24px' }}>
        Hiện tại bạn chưa có bạn bè
      </Text>
    </View>
  );
};

const chunkArray = (array, size) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, (index + 1) * size),
  );
};

export default ProfileScreen;
