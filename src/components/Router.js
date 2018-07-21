import { createStackNavigator } from 'react-navigation';
import Artists from './Artists';
import WelcomeScreen from './WelcomeScreen';
import ArtistDetails from './ArtistDetails';


const Router = createStackNavigator(
        {
                ArtistsRoute: Artists,
                WelcomeRoute: WelcomeScreen,
                ArtistDetailsRoute: ArtistDetails
        },
        {
            initialRouteName: 'WelcomeRoute'
        }
    );
export default Router;
