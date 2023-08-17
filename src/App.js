import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthContextProvider>
        {" "}
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
