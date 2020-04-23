import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import Firebase from '../config/Firebase'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'

class Login extends React.Component {
    handleLogin = () => {
        this.props.login()
        this.props.navigation.navigate('Profile')
    }
    goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Profile')
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.email}
                    onChangeText={email => this.props.updateEmail(email)}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.props.user.password}
                    onChangeText={password => this.props.updatePassword(password)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
                <Button
                    title="Don't have an account yet? Sign up"
                    onPress={() => this.props.navigation.navigate('Signup')}
                    titleStyle={{
                        color: '#555',
                        backgroundColor: '#555'
                      }}
                />

                
               <Button
  title='Forgot Password?'
  onPress={this.goToForgotPassword}
  titleStyle={{
    color: '#555',
    backgroundColor: '#555'
  }}
  type='clear'
/>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#fff',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#958',
        borderColor: '#958',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#958'

    },
    buttonSignup: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#958',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200

    }
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login , getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
