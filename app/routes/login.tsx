import React, { useState } from 'react';

// You would need to replace this path with the actual path to your background image file
const BACKGROUND_IMAGE_URL = 'jan-baborak-EKwruqcV_GY-unsplash.jpg'; 

const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex h-screen w-screen justify-center items-center overflow-hidden"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Full-screen overlay to apply the uniform blur and frost effect. */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: 'rgba(70, 0, 100, 0.05)', 
          backdropFilter: 'blur(10px) saturate(150%)', 
          WebkitBackdropFilter: 'blur(10px) saturate(150%)', 
        }}
      />

      {/* Main Content Container - REMOVED shadow-2xl for no outline separation */}
      <div 
        className="flex w-full max-w-5xl h-[70vh] relative z-10 text-white" // shadow-2xl removed here
        style={{
          backgroundColor: 'rgba(70, 0, 100, 0.01)', 
        }}
      >
        
        {/* Left Side: VidyarthiDesk Info */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-5xl font-serif mb-2 font-bold tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
            VidyarthiDesk
          </h1>
          <p className="text-lg text-white opacity-90">
            One Desk, Total Control
          </p>
        </div>

        {/* Central Vertical Line (Prominent White Line) */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-white opacity-80 z-20"></div>
        
        {/* Right Side: Sign In Form */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-xs">
            <h2 className="text-4xl font-bold text-white mb-10 tracking-widest text-center">
              SIGN IN
            </h2>

            {/* Username Input */}
            <div className="mb-8 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-0">
                <svg className="w-5 h-5 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full bg-transparent border-b-2 border-white text-white py-2 pl-6 focus:outline-none placeholder-white placeholder-opacity-70 text-lg"
              />
            </div>

            {/* Password Input (With Toggle) */}
            <div className="mb-8 relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-0">
                <svg className="w-5 h-5 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6-.487l-.422.213A.896.896 0 005 17.188V18a2 2 0 002 2h10a2 2 0 002-2v-.812a.896.896 0 00-.578-.802l-.422-.213M14 10V7a2 2 0 00-2-2m0 0a2 2 0 00-2 2v3m0 0h4m-4 0h4"></path></svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                className="w-full bg-transparent border-b-2 border-white text-white py-2 pl-6 focus:outline-none placeholder-white placeholder-opacity-70 text-lg pr-10" 
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                <svg className="w-5 h-5 text-white opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {showPassword ? (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.854 5 12 5c4.146 0 8.268 2.943 9.542 7-1.274 4.057-5.396 7-9.542 7-4.146 0-8.268-2.943-9.542-7z" />
                    </>
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.007 10.007 0 0112 19c-4.478 0-8.268-2.584-10-6.175 1.732-3.592 5.522-6.175 10-6.175 1.503 0 2.937.387 4.232 1.05M18.825 5.175L5.175 18.825" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.854 5 12 5c4.146 0 8.268 2.943 9.542 7-1.274 4.057-5.396 7-9.542 7-4.146 0-8.268-2.943-9.542-7z" />
                    </>
                  )}
                </svg>
              </button>
            </div>

            {/* Login Button */}
            <button
              className="w-full py-3 mt-4 text-xl font-semibold text-white rounded-full transition duration-300"
              style={{ 
                background: 'linear-gradient(to right, #9c27b0, #e91e63)',
                boxShadow: '0 4px 15px rgba(233, 30, 99, 0.4)'
              }}
            >
              LOGIN
            </button>

            {/* Help Link */}
            <div className="text-center mt-4">
              <span className="text-white text-sm mr-1 opacity-80">
                Having difficulties signing in?
              </span>
              <a href="#" className="text-blue-400 text-sm font-semibold hover:text-blue-300">
                Get Help
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer / Powered By */}
      <div className="absolute bottom-4 text-white text-opacity-80 text-sm z-20">
        Powered By <span className="font-bold">KERACODE</span>
      </div>
    </div>
  );
};

export default LoginScreen;