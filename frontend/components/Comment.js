import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FormatTimestamp from '../utils/FormatTimestamp';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, likeComment, unlikeComment } from '../store/post/postSlice';

const Comment = ({ item }) => {
  const [like, isLike] = useState(false);
  const { content, likes, post, user, _id, createdAt } = item;
  const { token, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (likes?.includes(currentUser.id)) {
      isLike(true);
    } else {
      isLike(false);
    }
  }, [item]);

  const handleDelete = () => {
    dispatch(deleteComment({ postId: post, commentId: _id, token }));
  };

  const handleLike = () => {
    if (like) {
      dispatch(unlikeComment({ postId: post, commentId: _id, token }));
    } else {
      dispatch(likeComment({ postId: post, commentId: _id, token }));
    }
    isLike(!like);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
      }}
    >
      <Avatar.Image size={50} source={user?.avatarUrl} />
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: '14px',
              marginRight: '10px',
            }}
          >
            {user.userName}
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.5)', fontSize: '14px' }}>
            {FormatTimestamp(createdAt)}
          </Text>
        </View>
        <Text style={{ width: '240px', marginBottom: '10px' }}>{content}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: '14px',
              marginRight: '15px',
            }}
          >
            Trả lời
          </Text>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: '14px' }}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleLike}>
          <Icon name="heart" size={24} color={like ? 'red' : 'black'} />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: '14px',
            marginTop: '10px',
          }}
        >
          {likes.length}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
