import {createStackNavigator, createAppContainer} from 'react-navigation';

// Import views
import Home from '../src/views/home';
import NewMoment from '../src/views/new-moment';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            title: `Home`,
            headerBackTitle: null
        }),
    },
    NewMoment: {
        screen: NewMoment,
        navigationOptions: () => ({
            title: `New Moment`,
            headerBackTitle: null
        }),
    },
},{
    initialRouteName: 'Home',
    headerMode: 'none'
});

const NavApp = createAppContainer(AppNavigator)

export default NavApp;