import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/Toastify";
export const AuthContext = createContext();

//* with custom hook
// export const useAuthCotext =() => {
//     return useContext(AuthContext)
// }

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    userObserver();
  }, []);
  const createUser = async (email, password, displayName) => {
    //yeni bir kullanıcı olusturmak ıcın kullanılan firebase metodu.. email ve paswordu register sayfasıında kullanıyoruz. valuesları burda olustururup contex.provider dan gonderıyoruz. register sayfasında cagırıyoruz

    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //kullanıcı profılı guncellemek ıcın kullanılan firebase metodu
      await updateProfile(auth.currentUser, {
        displayName,
      });
      console.log(userCredential);
      navigate("/");
      toastSuccessNotify("Registered succesfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };
  const signIn = async (email, password) => {
    try {
      //? mevcut kullanıcının giriş yapması için kullanılan firebase metodu
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
      toastSuccessNotify("Logged in successfully");
      console.log(userCredential);
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out succesfully");
  };
  const userObserver = () => {
    //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        console.log(user);
      } else {
        // User is signed out
        setCurrentUser(false);
        console.log("logged out");
      }
    });
  };

  const values = { createUser, signIn, logOut, currentUser };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
