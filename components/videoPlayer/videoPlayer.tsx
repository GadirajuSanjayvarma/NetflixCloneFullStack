import React, { useRef, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Video } from 'expo-av';
import styles from './styles';
import { Playback } from 'expo-av/build/AV';

interface VideoPlayerProps {
    episode:{
        id: string,
        title: string,
        poster: string,
        duration: string,
        plot: string,
        video: string



    };
}

const VideoPlayer = (props: VideoPlayerProps) => {
    
    const { episode } = props;

    const [videoURL, setVideoURL] = useState('');
    const video = useRef<Playback>(null);
    const [status, setStatus] = useState({});
    useEffect(() => {
        if (episode.video.startsWith('http')) {
            console.log("changed");
            setVideoURL(episode.video);
            console.log(episode);
           
            return;
        }
        
    }, [episode])

    useEffect(() => {
        if (!video) {
          
            return;
        }
        (async () => {
            console.log("video loading");
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                { uri: videoURL },
                {},
                false
            );
        })();
    }, [videoURL])



    return (
        <Video
            ref={video}
            style={styles.video}
            source={{
                uri: videoURL,
            }}
            posterSource={{
                uri: episode.poster,
            }}
            posterStyle={{
                resizeMode: 'cover',
            }}
            usePoster={true}
            useNativeControls
            resizeMode="contain"
            onPlaybackStatusUpdate={status => setStatus(() => status)}            
        />
    )
}

export default VideoPlayer;