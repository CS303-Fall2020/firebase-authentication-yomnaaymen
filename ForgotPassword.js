import React, { Component, Fragment } from 'react'
import { Text, SafeAreaView, View, StyleSheet,Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { withFirebaseHOC } from '../config/Firebase'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/Firebase'
import { bindActionCreators } from 'redux'
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email(Alert.alert('Please enter a registered email'))
    .required(Alert.alert('Please enter a registered email'))
})
class ForgotPassword extends Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values
  
    try {
      await this.props.firebase.passwordReset(email)
      console.log('Password reset email sent successfully')
      this.props.navigation.navigate('Login')
    } catch (error) {
      actions.setFieldError('general', 'error:please enter a valid email')
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
          }}
          
          
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
            <Fragment>
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#958'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='Send Email'
                  buttonColor='#958'
                  disabled={!isValid || isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </SafeAreaView>
    )
  }}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#555',
      marginTop: 150
    },
    text: {
      color: '#fff',
      fontSize: 24,
      marginLeft: 25
    },
    buttonContainer: {
      margin: 25
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
)(ForgotPassword)