const messages = [
  {
    _id: 1,
    text: '+91 232432324 is Added',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    system: true,
  },
  {
    _id: 2,
    text: 'Hello developer',
    createdAt: new Date(Date.UTC(2020, 5, 12, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'User 1',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: 'Hi! I work from home today!',
    createdAt: new Date(Date.UTC(2020, 5, 14, 17, 20, 0)),
    user: {
      _id: 3,
      name: 'User 2',
      avatar: 'https://placeimg.com/140/140/any',
    },
    image: 'https://placeimg.com/960/540/any',
  },
  {
    _id: 4,
    text: 'Hi!',
    createdAt: new Date(Date.UTC(2020, 5, 16, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'User 1',
      avatar: 'https://placeimg.com/140/140/any',
    },
    video:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    _id: 5,
    createdAt: new Date(Date.UTC(2020, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    _id: 6,
    text: 'Come on!',
    createdAt: new Date(Date.UTC(2020, 5, 15, 18, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 7,
    text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
        #react #react-native`,
    createdAt: new Date(Date.UTC(2020, 5, 12, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 8,
    text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
        #react #react-native`,
    createdAt: new Date(Date.UTC(2020, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 9,
    createdAt: new Date(Date.UTC(2020, 5, 13, 17, 10, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    video:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
  },
  {
    _id: 10,
    createdAt: new Date(Date.UTC(2020, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    Location: {
      latitude: 37.3318456,
      longitude: -122.0296002,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
  },
  {
    _id: 11,
    createdAt: new Date(Date.UTC(2020, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
    document: {
      sentDoc:
        'www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      sentDocName: 'Dummy Doc',
    },
  },
];

export default messages;
