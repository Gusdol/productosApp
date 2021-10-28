import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {loginStyles} from '../theme/LoginTheme';
import {WhiteLogo} from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContext} from '../Context/AuthContext';

interface Props extends NativeStackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  // custom hook useform
  const {email, password, name, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    console.log({email, password, name});
    Keyboard.dismiss();
    signUp({
      nombre: name,
      correo: email,
      password,
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856d6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* keyboard avoid view */}
        <View style={loginStyles.formContainer}>
          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="ingrese su nombre:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white" // linea debajo del input
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white" // al seleccionar el input se pone blanco
            onChangeText={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister} // sirve por si la persona presiona enter
            autoCapitalize="words" // capitalizar por letras
            autoCorrect={false} // que no auto corrija
          />

          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="ingresar email:"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address" // si es de tipo numerico email etc
            underlineColorAndroid="white" // linea debajo del input
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white" // al seleccionar el input se pone blanco
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister} // sirve por si la persona presiona enter
            autoCapitalize="none" // que no auto capitalize
            autoCorrect={false} // que no auto corrija
          />
          <Text style={loginStyles.label}>Password:</Text>
          <TextInput
            placeholder="*****"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white" // linea debajo del input
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white" // al seleccionar el input se pone blanco
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            autoCapitalize="none" // que no auto capitalize
            autoCorrect={false} // que no auto corrija
            secureTextEntry // para ocultar el password
          />

          {/* boton login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}>
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          {/* crear una nueva cuenta */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LoginScreen')}
            style={loginStyles.buttonReturn}>
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
