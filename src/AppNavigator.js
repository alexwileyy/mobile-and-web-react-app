import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Import views
import Home from '../src/views/home';
import NewMoment from '../src/views/new-moment';
import TextMoment from './views/text-moment';
import PictureMoment from './views/picture-moment';
import VideoMoment from './views/video-moment';

import NewTextMoment from './views/new-text-moment';
import NewPictureMoment from './views/new-picture-moment';
// import VideoMoment from './views/video-moment';
// import VideoMoment from './views/video-moment';

// export const NavStack = createAppContainer(AppNavigator);


export default function GetNavStack(props){

    const AppNavigator = createStackNavigator({
        Home: {
            screen: (navProps) => (<Home {...navProps} {...props} />)
        },
        NewMoment: {
            screen: (navProps) => <NewMoment {...navProps} {...props} />
        },
        TextMoment: {
            screen: (navProps) => <TextMoment {...navProps} {...props} />
        },
        PictureMoment: {
            screen: (navProps) => <PictureMoment {...navProps} {...props} />
        },
        VideoMoment: {
            screen: (navProps) => <VideoMoment {...navProps} {...props} />
        },
        NewTextMoment: {
            screen: (navProps) => <NewTextMoment {...navProps} {...props} />
        },
        NewPictureMoment: {
            screen: (navProps) => <NewPictureMoment {...navProps} {...props} />
        }

    },{
        initialRouteName: 'Home',
        headerMode: 'none'
    });

    return createAppContainer(AppNavigator);
};