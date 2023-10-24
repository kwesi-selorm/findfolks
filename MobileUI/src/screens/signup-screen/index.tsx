import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Form from '../../components/form'
import FormItem from '../../components/form/FormItem'
import AppInput from '../../components/form/AppInput'
import React, { useState } from 'react'
import AppButton from '../../components/AppButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { appColors, appFont } from '../../styles'
import ButtonGroup from '../../components/form/ButtonGroup'
import AppPressable from '../../components/AppPressable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { City, ContactMethod, Country } from '../../@types'
import ContactMethodsList from '../profile-screen/ContactMethodsList'
import ValidationErrorList from '../../components/form/ValidationErrorList'
import { CreateFolkValuesSchema, CreateFolkValuesType } from '../../@types/zod-types'
import { ParsedZodError, parseZodError } from '../../util/error-fns'
import CityAndCountrySearchModal from '../../components/CityAndCountrySearchModal'

const initialValues: CreateFolkValuesType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  homeCountry: '',
  homeCityOrTown: '',
  cityOrTownOfResidence: '',
  countryOfResidence: '',
  preferredContactMethod: ContactMethod.Facebook,
  contactInfo: '',
  bio: ''
}

const SignupScreen = () => {
  const [values, setValues] = useState(initialValues)
  const [cityItems, setCityItems] = React.useState<City[]>([])
  const [countryItems, setCountryItems] = React.useState<Country[]>([])
  const [searchModalVisible, setSearchModalVisible] = React.useState(false)
  const [searchItems, setSearchItems] = React.useState<Array<City | Country>>([])
  const [searchGroup, setSearchGroup] = React.useState<'cities' | 'countries'>('cities')
  const [validationErrors, setValidationErrors] = React.useState<ParsedZodError | undefined>(
    undefined
  )
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  function navigateToHome() {
    navigation.navigate('Home')
  }
  function navigateToLoginScreen() {
    navigation.navigate('Login')
  }

  //FORM ACTIONS
  function updateForm(update: Partial<CreateFolkValuesType>) {
    setValues((prev) => ({ ...prev, ...update }))
  }

  function handleHomeCountryInputPressIn() {
    setSearchModalVisible(true)
    setSearchGroup('countries')
    setSearchItems(countryItems)
  }
  function handleCityInputPressIn() {
    setSearchModalVisible(true)
    setSearchGroup('cities')
    setSearchItems(cityItems)
  }

  function handleOnCancel() {
    setValues(initialValues)
  }

  async function handleSubmit() {
    console.log({ values })

    const result = CreateFolkValuesSchema.safeParse(values)
    if (!result.success) {
      const errorMsgs = parseZodError(result.error)
      setValidationErrors(errorMsgs)
      return
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CityAndCountrySearchModal
        searchModalVisible={searchModalVisible}
        setSearchModalVisible={setSearchModalVisible}
        searchGroup={searchGroup}
        searchItems={searchItems}
        setSearchItems={setSearchItems}
        setCityItems={setCityItems}
        setCountryItems={setCountryItems}
        updateForm={updateForm}
        values={values}
        setValues={setValues}
        handleOnCancel={handleOnCancel}
      />
      <ScrollView>
        <Text style={styles.title}>Create a new folk profile!</Text>
        <Form>
          {/* Name */}
          <FormItem label="Name">
            <AppInput
              placeholder="Username"
              value={values.name}
              onChangeText={(text) => {
                updateForm({ name: text })
              }}
            />
          </FormItem>

          {/*Email*/}
          <FormItem label="Email">
            <AppInput
              placeholder="Email"
              value={values.email}
              onChangeText={(text) => {
                updateForm({ email: text })
              }}
            />
          </FormItem>

          {/* Password */}
          <FormItem label="Password">
            <AppInput
              placeholder="Password"
              secureTextEntry={true}
              value={values.password}
              onChangeText={(text) => {
                updateForm({ password: text })
              }}
            />
          </FormItem>

          {/* Confirm password */}
          <FormItem label="Confirm password">
            <AppInput
              placeholder="Confirm password"
              secureTextEntry={true}
              value={values.confirmPassword}
              onChangeText={(text) => {
                updateForm({ confirmPassword: text })
              }}
            />
          </FormItem>

          {/* Home country */}
          <FormItem label="Home country">
            <AppInput
              placeholder="Home country"
              onPressIn={() => handleHomeCountryInputPressIn()}
              value={values.homeCountry}
            />
          </FormItem>

          {/* BIO */}
          <FormItem label="Bio">
            <AppInput
              placeholder="Bio"
              value={values.bio}
              multiline={true}
              onChangeText={(text) => updateForm({ bio: text })}
            />
          </FormItem>

          {/* Residency city and town */}
          <FormItem label="City of residence">
            <AppInput
              placeholder="City of residence"
              onPressIn={() => handleCityInputPressIn()}
              value={values.cityOrTownOfResidence}
            />
          </FormItem>

          {/* Residency country */}
          <FormItem label="Country of residence">
            <AppInput
              placeholder="Select the city of residence to autopopulate"
              value={values.countryOfResidence}
              editable={false}
            />
          </FormItem>

          {/* Contact method */}
          <FormItem label="Contact method">
            <ContactMethodsList initialValues={initialValues} setValues={setValues} />
          </FormItem>

          {/* Contact information */}
          <FormItem label="Contact information">
            <AppInput
              placeholder="Contact info"
              value={values.contactInfo}
              onChangeText={(text) => updateForm({ contactInfo: text })}
            />
          </FormItem>

          {/*Validation errors */}
          <ValidationErrorList parsedError={validationErrors} />

          {/*Buttons*/}
          <ButtonGroup>
            <AppButton
              text="Cancel"
              backgroundColor={appColors.darkGrey}
              icon={<Ionicons name="ios-close" size={25} color={appColors.darkGrey} />}
              accessibilityLabel="Cancel button"
              onPress={navigateToHome}
              outline
            />
            <AppButton
              text="Sign up!"
              icon={<FeatherIcon name="user-check" size={25} color={appColors.white} />}
              backgroundColor={appColors.green}
              accessibilityLabel="Sign up button"
              onPress={navigateToLoginScreen}
            />
          </ButtonGroup>
        </Form>
        {/*Prompt*/}
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>Already have a folk account? </Text>
          <AppPressable onPress={navigateToLoginScreen} accessibilityLabel="Return to login screen">
            <Text style={styles.loginText}>Return to Login</Text>
          </AppPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: appFont.extraBold,
    alignSelf: 'center',
    fontSize: 25,
    width: '80%',
    textAlign: 'center',
    marginTop: 20
  },
  promptContainer: {
    marginTop: 'auto'
  },
  prompt: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: appFont.regular,
    fontSize: 15
  },
  loginText: {
    color: appColors.blue,
    fontSize: 16,
    fontFamily: appFont.bold,
    textAlign: 'center',
    alignSelf: 'center'
  }
})

export default SignupScreen
