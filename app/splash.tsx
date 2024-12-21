import React, {FunctionComponent} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
    onFinish: (param: boolean) => void;
}

const SplashScreen: FunctionComponent<Props> = ({onFinish}) => {
    /* FIX WEB ERROR
    // if (Platform.OS === 'web') {
    //     return null;
    } */
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/icon.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            
            <LottieView
                source={require('../assets/lottie/splash.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => onFinish(true)}
                style={styles.lottie}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
        position: 'absolute',
        bottom: 70,
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
});

export default SplashScreen;
