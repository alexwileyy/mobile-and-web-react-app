import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Import views
import Home from '../src/views/home';
import NewMoment from '../src/views/new-moment';
import TextMoment from './views/text-moment';
import PictureMoment from './views/picture-moment';

// export const NavStack = createAppContainer(AppNavigator);


export default function GetNavStack(props){

    const AppNavigator = createStackNavigator({
        Home: {
            screen: () => <Home {...props} />
        },
        NewMoment: {
            screen: () => <NewMoment {...props} />
        },
        TextMoment: {
            screen: () => <TextMoment {...props} />
        },
        PictureMoment: {
            screen: () => <PictureMoment {...props} />
        },

    },{
        initialRouteName: 'Home',
        headerMode: 'none'
    });

    return createAppContainer(AppNavigator);
};