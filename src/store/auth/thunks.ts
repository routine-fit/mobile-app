import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createAsyncThunk } from '@reduxjs/toolkit';

import firebaseAuth from 'src/config/firebase';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
}

export const startLoginWithEmailPassword = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const resp = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      const { uid, displayName } = resp.user;

      const idToken = await resp.user.getIdToken();
      await AsyncStorage.setItem('token', idToken);
      return {
        uid,
        displayName,
        email,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred during login');
    }
  },
);

export const startGoogleSignIn = createAsyncThunk(
  'auth/google-signin',
  async (_, { rejectWithValue }) => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user } =
        await firebaseAuth.signInWithCredential(googleCredential);

      const firebaseToken = await user.getIdToken();
      await AsyncStorage.setItem('token', firebaseToken);

      const { uid, displayName, email } = user;
      return { uid, displayName, email };
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred during login');
    }
  },
);

export const startCreateFirebaseUser = createAsyncThunk(
  'auth/signup',
  async (credentials: SignUpCredentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const resp = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password,
      );
      const { uid, displayName } = resp.user;

      return {
        uid,
        displayName,
        email,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during signup',
      );
    }
  },
);

export const startLogoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await firebaseAuth.signOut();
      await AsyncStorage.removeItem('token');
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'An error occurred during logout',
      );
    }
  },
);
