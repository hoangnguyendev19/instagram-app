import { Image, Text, View, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Name from '../assets/img/name.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Post from '../components/Post';
import { Menu } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../store/post/postSlice';

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.auth);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState({});

  console.log(posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (posts) {
      setPostList(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigation.navigate('Login');
    }
  }, [currentUser]);

  const handleHidePost = (postId) => {
    const newPostList = postList.filter((post) => post.id !== postId);
    setPostList(newPostList);
  };

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: '10px',
          paddingHorizontal: '15px',
          alignItems: 'center',
        }}
      >
        <View>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={Name}
                  style={{ width: '105px', height: '30px', marginRight: '5px' }}
                />
                <Icon name="angle-down" size="24px" />
              </TouchableOpacity>
            }
            style={{ paddingTop: 40 }}
          >
            <Menu.Item onPress={() => {}} title="Đang theo dõi" trailingIcon="account-supervisor" />
            <Menu.Item onPress={() => {}} title="Yêu thích" trailingIcon="star-outline" />
          </Menu>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon name="heart" size="24px" />
          <Icon name="paper-plane" size="24px" style={{ marginLeft: '25px' }} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator
        contentContainerStyle={{
          height: 'auto',
        }}
      >
        <View
          style={{
            marginTop: '10px',
            borderBottomWidth: '1px',
            borderStyle: 'solid',
            borderBottomColor: 'rgba(0,0,0,0.3)',
            paddingBottom: '5px',
          }}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ alignItems: 'center', paddingHorizontal: '5px' }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Story', { id: currentUser?.id })}
                style={{ alignItems: 'center' }}
              >
                <Image
                  source={user?.avatarUrl}
                  style={{
                    borderRadius: '50px',
                    width: '80px',
                    height: '80px',
                    borderWidth: '5px',
                    borderColor: '#ae1188',
                    marginBottom: '10px',
                  }}
                />
                <Text style={{ fontSize: '13px' }}>Tin của bạn</Text>
              </TouchableOpacity>
            </View>

            {user?.following?.length > 0 &&
              user.following.map((item) => {
                return (
                  <View key={item.id} style={{ paddingHorizontal: '5px' }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Story', { id: item.id })}
                      style={{ alignItems: 'center' }}
                    >
                      <Image
                        source={item.avatarUrl}
                        style={{
                          borderRadius: '50px',
                          width: '80px',
                          height: '80px',
                          borderWidth: '5px',
                          borderColor: '#ae1188',
                          marginBottom: '10px',
                        }}
                      />
                      <Text style={{ fontSize: '13px' }}>{item.userName}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        </View>
        <FlatList
          data={postList}
          renderItem={({ item }) => <Post item={item} handleHidePost={handleHidePost} />}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
