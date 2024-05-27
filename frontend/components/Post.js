import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormatTimestamp from '../utils/FormatTimestamp';
import { useEffect, useState } from 'react';
import { Menu, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../store/auth/authSlice';
import { deletePost } from '../store/post/postSlice';
import { likePost, unlikePost } from '../store/post/postDetailSlice';
import CommentModal from './CommentModal';

const Post = ({ item, handleHidePost }) => {
  const { id, caption, imageUrl, likes, comments, location, createdAt, user } = item;
  const [like, isLike] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [modal, setModal] = useState(false);

  const [visible, setVisible] = useState(false);
  const [follow, setFollow] = useState('');
  const { currentUser, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.id !== user?.id) {
      const result = currentUser?.following?.find((us) => us.id === user?.id);
      if (result) {
        setFollow('unfollow');
      } else {
        setFollow('follow');
      }
    } else {
      setFollow('delete');
    }
  }, [currentUser]);

  useEffect(() => {
    if (likes) {
      setNumOfLikes(likes?.length);
      const result = likes?.find((us) => us.id === currentUser?.id);
      if (result) {
        isLike(true);
      } else {
        isLike(false);
      }
    }
  }, [likes]);

  const handleFollow = () => {
    dispatch(followUser({ userId: user.id, token }));
  };

  const handleUnFollow = () => {
    dispatch(unfollowUser({ userId: user.id, token }));
  };

  const handleDelete = () => {
    dispatch(deletePost({ postId: id, token }));
  };

  const handleLike = () => {
    if (like) {
      dispatch(unlikePost({ postId: id, token }));
      setNumOfLikes(numOfLikes - 1);
    } else {
      dispatch(likePost({ postId: id, token }));
      setNumOfLikes(numOfLikes + 1);
    }
    isLike(!like);
  };

  return (
    <View>
      <View
        style={{
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '15px',
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image source={user?.avatarUrl} size={50} />
            <View style={{ marginLeft: '10px' }}>
              <Text style={{ fontStyle: 'italic', fontSize: '16px' }}>{user?.userName}</Text>
              <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>{location}</Text>
            </View>
          </View>
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
                  <Icon name="ellipsis-v" size={24} />
                </TouchableOpacity>
              }
              style={{ paddingTop: 40 }}
            >
              <Menu.Item
                onPress={() => {
                  handleHidePost(id);
                }}
                title="Ẩn bài viết"
                leadingIcon="eye-off-outline"
              />
              <Menu.Item
                onPress={() => {}}
                title="Thêm vào mục yêu thích"
                leadingIcon="cards-heart-outline"
              />
              {follow === 'delete' ? (
                <Menu.Item
                  onPress={handleDelete}
                  title="Xoá bài viết"
                  leadingIcon="delete-outline"
                />
              ) : follow === 'follow' ? (
                <Menu.Item onPress={handleFollow} title="Theo dõi" leadingIcon="plus" />
              ) : (
                <Menu.Item
                  onPress={handleUnFollow}
                  title="Bỏ theo dõi"
                  leadingIcon="delete-outline"
                />
              )}
            </Menu>
          </View>
        </View>
        <View style={{ marginTop: '10px' }}>
          <Image source={imageUrl} style={{ width: '100%', height: '400px' }} />
        </View>
        <View style={{ paddingHorizontal: '15px' }}>
          <View
            style={{
              marginVertical: '10px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleLike}>
                <Icon
                  name="heart"
                  size={28}
                  style={{ marginRight: '15px' }}
                  color={like ? 'red' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModal(true)}>
                <Icon name="comment" size={28} style={{ marginRight: '15px' }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="paper-plane" size={28} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Icon name="bookmark" size={28} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
            {numOfLikes} lượt thích
          </Text>
          <View
            style={{
              marginBottom: '10px',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: '16px' }}>{user?.userName}</Text>
            <Text style={{ fontWeight: '400', fontSize: '16px', marginLeft: '5px' }}>
              {caption}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModal(true)}>
            <Text style={{ fontSize: '16px', color: '#ccccc', marginBottom: '10px' }}>
              Xem tất cả {comments?.length} bình luận
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
            <Avatar.Image source={currentUser?.avatarUrl} size={30} />
            <TouchableOpacity style={{ marginLeft: '10px' }} onPress={() => setModal(true)}>
              <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: '16px' }}>Thêm bình luận...</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#ccccc' }}>{FormatTimestamp(createdAt)}</Text>
        </View>
      </View>
      <CommentModal modal={modal} setModal={setModal} comments={comments} postId={id} />
    </View>
  );
};

export default Post;
