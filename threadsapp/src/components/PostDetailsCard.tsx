import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import getTimeDuration from '../common/TimeGenerator';
import {
  addLikes,
  addLikesToRepliesReply,
  addLikesToReply,
  removeLikes,
  removeLikesFromRepliesReply,
  removeLikesFromReply,
} from '../../redux/actions/postAction';
import axios from 'axios';
import {URI} from '../../redux/URI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  isRepliesReply?: boolean;
};

const PostDetailsCard = ({
  item,
  isReply,
  navigation,
  postId,
  isRepliesReply,
}: Props) => {
  const {user, token,users} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    userName:'',
    avatar: {
      url: 'https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png',
    },
  });

  const time = item?.createdAt;
  const formattedDuration = getTimeDuration(time);

  const profileHandler = async (e: any) => {
    await axios
      .get(`${URI}/get-user/${e._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        if (res.data.user._id !== user._id) {
          navigation.navigate('UserProfile', {
            item: res.data.user,
          });
        } else {
          navigation.navigate('Profile');
        }
      });
  };

  const reactsHandler = (e: any) => {
    if (item.likes.length !== 0) {
      const isLikedBefore = item.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      } else {
        addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
      }
    } else {
      addLikes({postId: postId ? postId : e._id, posts, user})(dispatch);
    }
  };

  const replyReactHanlder = (e: any) => {
    if (e.likes.length !== 0) {
      const isLikedBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikesFromReply({
          postId: postId ? postId : e._id,
          posts,
          replyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      } else {
        addLikesToReply({
          postId: postId ? postId : e._id,
          posts,
          replyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      }
    } else {
      addLikesToReply({
        postId: postId ? postId : e._id,
        posts,
        replyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
  };

  const handlePress = async (e: any) => {
    setActive(!active);
    await AsyncStorage.setItem('replyId', e._id);
  };

  const repliesReplyReactHandler = async (e: any) => {
    const replyId = await AsyncStorage.getItem('replyId');
    if (e.likes.length !== 0) {
      const isLikedBefore = e.likes.find((i: any) => i.userId === user._id);
      if (isLikedBefore) {
        removeLikesFromRepliesReply({
          postId: postId,
          posts,
          replyId,
          singleReplyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      } else {
        addLikesToRepliesReply({
          postId: postId,
          posts,
          replyId,
          singleReplyId: e._id,
          user,
          title: e.title,
        })(dispatch);
      }
    } else {
      addLikesToRepliesReply({
        postId: postId,
        posts,
        replyId,
        singleReplyId: e._id,
        user,
        title: e.title,
      })(dispatch);
    }
  };

  useEffect(() => {
    if(users){
      const updatedUsers = [...users, user];
      const userData = updatedUsers.find((user: any) =>
          user._id === item.user._id
       );
       setUserInfo(userData);
     }
  }, [users]);

  return (
    <View
      className={`p-4 ${!isReply && 'border-b-gray-900 border-b'}`}
      style={{left: isReply ? 20 : 0, width: isReply ? '95%' : '100%'}}>
      <View style={tw`relative`}>
        <View style={tw`flex-row w-full justify-between`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => profileHandler(userInfo)}>
              <Image
                source={{uri: userInfo.avatar.url}}
                width={40}
                height={40}
                borderRadius={100}
              />
            </TouchableOpacity>
            <View style={tw`pl-3`}>
              <TouchableOpacity onPress={() => profileHandler(userInfo)}>
                <View style={tw`relative flex-row items-center`}>
                  <Text style={tw`text-black font-semibold text-lg`}>
                    {userInfo.name}
                  </Text>
                  {item.role === 'Admin' && (
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                      }}
                      width={15}
                      height={15}
                      style={tw`ml-1 absolute bottom-0 left-0`}
                    />
                  )}
                </View>
                <Text style={tw`text-sm text-black`}>{userInfo?.userName}</Text>
              </TouchableOpacity>
              <Text style={tw`text-black font-semibold text-sm`}>
                {item.title}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-black`}>{formattedDuration}</Text>
            <TouchableOpacity>
              <Text style={tw`text-black pl-4 font-bold mb-3`}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`ml-5 my-3`}>
          {item.image && (
            <Image
              source={{uri: item.image.url}}
              style={{aspectRatio: 1, borderRadius: 10, zIndex: 1111}}
              resizeMode="contain"
            />
          )}
        </View>
        {item.image ? (
          <View style={tw`absolute top-14 left-5 h-90 w-1 bg-black`} />
        ) : (
          <View style={tw`absolute top-12 left-5 h-60 w-1 bg-black`} />
        )}
        <View style={tw`flex-row items-center left-5 top-3`}>
          <TouchableOpacity
            onPress={() =>
              !isRepliesReply
                ? !isReply
                  ? reactsHandler(item)
                  : replyReactHanlder(item)
                : repliesReplyReactHandler(item)
            }>
            {item.likes.length > 0 ? (
              <>
                {item.likes.find((i: any) => i.userId === user._id) ? (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
                    }}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                    }}
                    width={30}
                    height={30}
                  />
                )}
              </>
            ) : (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/2589/2589197.png',
                }}
                width={30}
                height={30}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateReplies', {
                item: item,
                navigation: navigation,
                postId: postId,
              });
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5948/5948565.png',
              }}
              width={22}
              height={22}
              style={tw`ml-5`}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3905/3905866.png',
              }}
              width={25}
              height={25}
              style={tw`ml-5`}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/10863/10863770.png',
              }}
              width={25}
              height={25}
              style={tw`ml-5`}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`pl-5 pt-4 flex-row`}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PostDetails', {
                data: item,
              })
            }></TouchableOpacity>
          <Text style={tw`text-lg text-black`}>
            {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
          </Text>
        </View>

        {isRepliesReply && (
          <View style={tw`pl-5 pt-4 flex-row`}>
            <Text style={tw`text-lg text-black`}>
              {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
            </Text>
          </View>
        )}
      </View>
      {item.reply && (
        <>
          {item.reply.length !== 0 && (
            <>
              <View style={tw`flex-row items-center`}>
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Text style={tw`ml-5 mt-3 text-black text-lg`}>
                    {active ? 'Hide Replies' : 'View Replies'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={tw`ml-3 mt-3 text-black text-lg`}>
                    {item.likes.length}{' '}
                    {item.likes.length > 1 ? 'likes' : 'like'}
                  </Text>
                </TouchableOpacity>
              </View>
              {active && (
                <>
                  {item.reply.map((i: any) => (
                    <PostDetailsCard
                      navigation={navigation}
                      item={i}
                      key={i._id}
                      isReply={true}
                      postId={postId}
                      isRepliesReply={true}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default PostDetailsCard;
