import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

// Import views
import Home from '../src/views/home';
import NewMoment from '../src/views/new-moment';

// export const NavStack = createAppContainer(AppNavigator);


export default function GetNavStack(props){

    const AppNavigator = createStackNavigator({
        Home: {
            screen: () => <Home {...props} />,
            navigationOptions: () => ({
                title: `Home`,
                headerBackTitle: null
            }),
        },
        NewMoment: {
            screen: () => <NewMoment {...props} />,
            navigationOptions: () => ({
                title: `New Moment`,
                headerBackTitle: null
            }),
        },
    },{
        initialRouteName: 'Home',
        headerMode: 'none'
    });

    return createAppContainer(AppNavigator);
};