import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {createPostAction, getAllPosts} from '../../redux/actions/postAction';
import tw from 'tailwind-react-native-classnames';

type Props = {
  navigation: any;
};

const PostScreen = ({navigation}: Props) => {
  const {user} = useSelector((state: any) => state.user);
  const {isSuccess, isLoading} = useSelector((state: any) => state.post);
  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (
      replies.length === 1 &&
      replies[0].title === '' &&
      replies[0].image === ''
    ) {
      setReplies([]);
    }
    if (isSuccess) {
      navigation.goBack();
      getAllPosts()(dispatch);
    }
    setReplies([]);
    setTitle('');
    setImage('');
  }, [isSuccess]);

  const [replies, setReplies] = useState([
    {
      title: '',
      image: '',
      user,
    },
  ]);

  const handleTitleChange = (index: number, text: string) => {
    setReplies(prevPost => {
      const updatedPost = [...prevPost];
      updatedPost[index] = {...updatedPost[index], title: text};
      return updatedPost;
    });
  };

  const uploadImage = (index: number) => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.9,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setReplies(prevPost => {
          const updatedPost = [...prevPost];
          updatedPost[index] = {
            ...updatedPost[index],
            image: 'data:image/jpeg;base64,' + image?.data,
          };
          return updatedPost;
        });
      }
    });
  };

  const addNewThread = () => {
    if (
      replies[activeIndex].title !== '' ||
      replies[activeIndex].image !== ''
    ) {
      setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
      setActiveIndex(replies.length);
    }
  };

  const removeThread = (index: number) => {
    if (replies.length > 0) {
      const updatedPost = [...replies];
      updatedPost.splice(index, 1);
      setReplies(updatedPost);
      setActiveIndex(replies.length - 1);
    } else {
      setReplies([{title: '', image: '', user}]);
    }
  };

  const addFreshNewThread = () => {
    if (title !== '' || image !== '') {
      setActive(true);
      setReplies(prevPost => [...prevPost, {title: '', image: '', user}]);
      setActiveIndex(replies.length);
    }
  };

  const postImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true,
    }).then((image: ImageOrVideo | null) => {
      if (image) {
        setImage('data:image/jpeg;base64,' + image.data);
      }
    });
  };

  const createPost = () => {
    if (title !== '' || (image !== '' && !isLoading)) {
      createPostAction(title, image, user, replies)(dispatch);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`w-full flex-row items-center m-3`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
            }}
            style={{
              width: 18,
              height: 18,
            }}
          />
        </TouchableOpacity>
        <Text style={tw`pl-4 text-lg font-semibold text-black`}>
          New Thread
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`m-3 flex-1 justify-between`}>
          <View>
            {/* create post */}
            <View style={tw`mt-3 flex-row`}>
              <Image
                source={{uri: user?.avatar.url}}
                style={{width: 40, height: 40}}
                borderRadius={100}
              />
              <View style={tw`pl-3`}>
                <View style={tw`w-80 flex-row justify-between`}>
                  <Text style={tw`text-lg font-semibold text-black`}>
                    {user?.name}
                  </Text>
                  <TouchableOpacity>
                    <Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Start a thread..."
                  placeholderTextColor={'#000'}
                  value={title}
                  onChangeText={text => setTitle(text)}
                  style={tw`mt-1 text-black text-lg`}
                />
                <TouchableOpacity style={tw`mt-2`} onPress={postImageUpload}>
                  <Image
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png',
                    }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    tintColor={'#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {image && (
              <View style={tw`m-2`}>
                <Image
                  source={{uri: image}}
                  width={200}
                  height={300}
                  resizeMethod="auto"
                  alt=""
                />
              </View>
            )}
            {replies.length === 0 && (
              <View style={tw`flex-row m-3 w-full items-start mt-5 opacity-7`}>
                <Image
                  source={{uri: user?.avatar.url}}
                  style={{width: 30, height: 30}}
                  borderRadius={100}
                />
                <Text style={tw`pl-3 text-black`} onPress={addFreshNewThread}>
                  Add to thread ...
                </Text>
              </View>
            )}

            {replies.map((item, index) => (
              <View key={index}>
                <View style={tw`mt-3 flex-row`}>
                  <Image
                    source={{uri: user?.avatar.url}}
                    style={{width: 40, height: 40}}
                    borderRadius={100}
                  />
                  <View style={tw`pl-3`}>
                    <View style={tw`w-80 flex-row justify-between`}>
                      <Text style={tw`text-lg font-semibold text-black`}>
                        {user?.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeThread(index)}>
                        <Image
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961937.png',
                          }}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      placeholder="Start a thread..."
                      placeholderTextColor={'#000'}
                      value={item.title}
                      onChangeText={text => handleTitleChange(index, text)}
                      style={tw`mt-2 text-black] text-lg`}
                    />
                    <TouchableOpacity
                      style={tw`mt-2`}
                      onPress={() => uploadImage(index)}>
                      <Image
                        source={{
                          uri: 'https://cdn-icons-png.flaticon.com/512/10857/10857463.png',
                        }}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {item.image && (
                  <View style={tw`m-2`}>
                    <Image
                      source={{uri: item.image}}
                      width={200}
                      height={300}
                      resizeMethod="auto"
                      alt=""
                    />
                  </View>
                )}
                {index === activeIndex && (
                  <View
                    style={tw`flex-row m-3 w-full items-start mt-5 opacity-7`}>
                    <Image
                      source={{uri: user?.avatar.url}}
                      style={{width: 30, height: 30}}
                      borderRadius={100}
                    />
                    <Text style={tw`pl-3 text-black`} onPress={addNewThread}>
                      Add to thread ...
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={tw`p-2 flex-row justify-between mx-1`}>
        <Text style={tw`text-black px-1 py-1`}>Anyone can reply</Text>
        <TouchableOpacity onPress={createPost}>
          <Text style={tw`text-blue-700 font-bold text-lg`}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
