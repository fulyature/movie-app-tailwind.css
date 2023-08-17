import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  let navigate = useNavigate();
  const createUser = async (email, password) => {
    //yeni bir kullanıcı olusturmak ıcın kullanılan firebase metodu.. email ve paswordu register sayfasıında kullanıyoruz. valuesları burda olustururup contex.provider dan gonderıyoruz. register sayfasında cagırıyoruz

    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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

      console.log(userCredential);
    } catch (error) {}
  };

  const values = { createUser, signIn };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
