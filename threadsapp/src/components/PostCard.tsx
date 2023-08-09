import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import getTimeDuration from '../common/TimeGenerator';
import {
  addLikes,
  getAllPosts,
  removeLikes,
} from '../../redux/actions/postAction';
import axios from 'axios';
import {URI} from '../../redux/URI';
import PostDetailsCard from './PostDetailsCard';
import tw from 'tailwind-react-native-classnames';

type Props = {
  navigation: any;
  item: any;
  isReply?: boolean | null;
  postId?: string | null;
  replies?: boolean | null;
};

const PostCard = ({item, isReply, navigation, postId, replies}: Props) => {
  const {user, token,users} = useSelector((state: any) => state.user);
  const {posts} = useSelector((state: any) => state.post);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '',
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

  const deletePostHandler = async (e: any) => {
    await axios
      .delete(`${URI}/delete-post/${e}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        getAllPosts()(dispatch);
      });
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
    <View style={tw`p-3 border-b border-gray-900`}>
      <View style={tw`relative`}>
        <View style={tw`flex-row w-full`}>
          <View style={tw`flex-row w-80 items-center`}>
            <TouchableOpacity onPress={() => profileHandler(item.user)}>
              <Image
                source={{uri: userInfo?.avatar?.url}}
                width={40}
                height={40}
                borderRadius={100}
              />
            </TouchableOpacity>
            <View style={tw`pl-3 w-70`}>
              <TouchableOpacity
                style={tw`flex-row items-center`}
                onPress={() => profileHandler(userInfo)}>
                <Text style={tw`text-black font-bold text-md`}>
                  {userInfo?.name}
                </Text>
                {userInfo?.role === 'Admin' && (
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828640.png',
                    }}
                    width={15}
                    height={15}
                    style={tw`ml-1`}
                  />
                )}
              </TouchableOpacity>
              <Text style={tw`text-black font-bold text-sm`}>{item.title}</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-900`}>{formattedDuration}</Text>
            <TouchableOpacity
              onPress={() => item.user._id === user._id && setOpenModal(true)}>
              <Text style={tw`text-black pl-4 font-bold mb-3`}>...</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`ml-4 my-3`}>
          {item.image && (
            <Image
              source={{uri: item.image.url}}
              style={{aspectRatio: 1, borderRadius: 10, zIndex: 1111}}
              resizeMode="contain"
            />
          )}
        </View>
        {item.image ? (
          <View style={tw`absolute top-12 left-5 h-90 w-1 bg-gray-950`} />
        ) : (
          <View style={tw`absolute top-12 left-5 h-60 w-1 bg-gray-950`} />
        )}
        <View style={tw`flex-row items-center left-5 top-5`}>
          <TouchableOpacity onPress={() => reactsHandler(item)}>
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
        {!isReply && (
          <View style={tw`pl-5 pt-4 flex-row`}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PostDetails', {
                  data: item,
                })
              }>
              <Text style={tw`pl-5 pt-4 flex-row`}>
                {item?.replies?.length !== 0 &&
                  `${item?.replies?.length} replies ·`}{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                item.likes.length !== 0 &&
                navigation.navigate('PostLikeCard', {
                  item: item.likes,
                  navigation: navigation,
                })
              }>
              <Text style={tw`pl-5 pt-4 flex-row`}>
                {item.likes.length} {item.likes.length > 1 ? 'likes' : 'like'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {replies && (
          <>
            {item?.replies?.map((i: any) => (
              <PostDetailsCard
                navigation={navigation}
                key={i._id}
                item={i}
                isReply={true}
                postId={item._id}
              />
            ))}
          </>
        )}
        {openModal && (
          <View style={tw`flex-1 justify-center items-center mt-5`}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={openModal}
              onRequestClose={() => {
                setOpenModal(!openModal);
              }}>
              <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                <View style={tw`flex-1 justify-end bg-black`}>
                  <TouchableWithoutFeedback onPress={() => setOpenModal(true)}>
                    <View
                      style={tw`w-full bg-white h-9 rounded-lg p-5 items-center drop-shadow-md shadow-inner`}>
                      <TouchableOpacity
                        style={tw`w-full bg-black h-6 rounded-sm items-center flex-row pl-5`}
                        onPress={() => deletePostHandler(item._id)}>
                        <Text style={tw`text-lg font-semibold text-red-500`}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostCard;
