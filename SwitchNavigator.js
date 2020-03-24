import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from "react-navigation-stack";
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import ForgotPassword from '../screens/ForgotPassword'

const SwitchNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        },
        ForgotPassword: {
            screen: ForgotPassword
        
    
        }
    },
    
   
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)