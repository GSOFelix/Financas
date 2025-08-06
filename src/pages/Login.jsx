import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Login(){
    const { user } = useAuth();
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
    
          if (querySnapshot.empty) {
            await addDoc(collection(db, "users"), {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              createdAt: new Date(),
            });
          } 
          navigate('/dashboard');
        } catch (error) {
          console.error("Erro ao fazer login com Google:", error);
        }
      };

      useEffect(() => {
        if (user) {
          navigate('/dashboard', { replace: true });
        }
      }, [user, navigate]);
    return(
    
        <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-[#171717] rounded-xl p-8 card-shadow">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-6">
                            <span className="text-[#22c55e]">Finanças</span>
                            <span className="text-white">Pessoais</span>
                        </h1>
                        <h2 className="text-xl font-semibold text-white mb-2">Bem Vindo ao melhor controle de finanças</h2>
                        <p className="text-gray-300">Entre para acessar sua conta</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#171717] text-gray-300">Continue with</span>
                            </div>
                        </div>
                        
                        <button className="google-btn w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg bg-[#262626] text-white font-medium transition-all duration-200 hover:bg-[#404040]"
                        onClick={signInWithGoogle}>
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_13183_10121)">
                                    <path d="M20.308 10.2303C20.308 9.55056 20.2529 8.86711 20.1355 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.308 13.2728 20.308 10.2303Z" fill="#4285F4"/>
                                    <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006Z" fill="#34A853"/>
                                    <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169Z" fill="#FBBC04"/>
                                    <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805Z" fill="#EA4335"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_13183_10121">
                                        <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                                       
                </div>
                 
            </div>
        </div>
    )
}