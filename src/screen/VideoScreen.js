import React, { useEffect } from 'react'
import Video from 'react-native-video';
import { StyleSheet, Platform } from 'react-native';


const VideoScreen = ({ seconds, currentTimer, onClick, url }) => {
  useEffect(() => {
    clearInterval(currentTimer);
  }, [seconds, currentTimer]);
  const sourceFileIOS = require('../../images/video.mp4')
  const sourceFileAndroid = { uri: url }

  return (
    <Video
      source={Platform.OS == 'ios' ? sourceFileIOS : sourceFileAndroid}
      onEnd={() => onClick()}
      onError={this.videoError}
      fullscreen={true}
      resizeMode="cover"
      style={styles.backgroundVideo} />
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    aspectRatio: 1.2,
    height: '100%',
  }
});

export default VideoScreen