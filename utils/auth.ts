import { auth } from "@/config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();
// Google Login Function
export const signInWithGoogle = async () => {
  try {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: "925499850292-aftbj3n4cq2tf6o3s6uqcenvh9r667o4.apps.googleusercontent.com",
      // iosClientId: "MY_IOS_GOOGLE_CLIENT_ID", don't have
      // androidClientId: "MY_ANDROID_GOOGLE_CLIENT_ID", don't have
    });

    if (response?.type === "success") {
      const { idToken } = response.authentication!;
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      return { user: auth.currentUser, error: null };
    }

    return { user: null, error: "Google sign-in failed" };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

// Signup function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    //console.error("Signup Error:", error);
    return { user: null, error: (error as Error).message };
  }
};

// Login function
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    //console.error("Login Error:", error);
    return { user: null, error: (error as Error).message };
  }
};

// Logout function
export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    //console.error("Logout Error:", error);
    return { error: (error as Error).message };
  }
};
