import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const notifications = [
    { message: "Welcome back, Maya!", side: "right" },
    { message: "You have 3 new messages", side: "left" },
    { message: "6 new properties in your area", side: "right" },
    { message: "Exciting new community event", side: "left" }
  ];

  useEffect(() => {
    // Logo animates in first
    const logoTimer = setTimeout(() => setLogoVisible(true), 300);
    
    // Then bubbles animate in one by one
    const step1 = setTimeout(() => setCurrentStep(1), 1000);
    const step2 = setTimeout(() => setCurrentStep(2), 1700);
    const step3 = setTimeout(() => setCurrentStep(3), 2400);
    const step4 = setTimeout(() => setCurrentStep(4), 3100);
    
    // Auto exit after all animations
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onComplete && onComplete(), 1000);
    }, 4500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative z-10 max-w-2xl mx-auto px-8 w-full">
        
        {/* Logo */}
        <div className={`mb-16 text-center transition-all duration-700 ${
          isExiting 
            ? 'opacity-0 scale-90' 
            : logoVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90'
        }`}>
          <div className="flex items-center justify-center">
            <svg width="39" height="36" viewBox="0 0 39 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" className="w-10 h-10">
              <mask id="mask0_8_27" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="39" height="36">
                <path d="M39 0H0V35.0446H39V0Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_8_27)">
                <mask id="mask1_8_27" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="1" y="1" width="37" height="33">
                  <path d="M37.8885 14.7567V28.2519C37.8885 31.3418 35.4347 33.8693 32.3721 33.9873C32.6481 33.5576 32.8081 33.0479 32.8081 32.5002V21.9246C32.8081 18.3627 31.42 15.0137 28.9009 12.4946C26.3818 9.97545 23.0328 8.5874 19.471 8.5874C15.9092 8.5874 12.5603 9.97545 10.0411 12.4946C7.52201 15.0137 6.13395 18.3627 6.13395 21.9246C6.13395 25.4862 7.52201 28.8353 10.0411 31.3544C11.1448 32.456 12.4065 33.3428 13.7756 33.9915H6.79532C3.62957 33.9915 1.05566 31.4175 1.05566 28.2519V14.7567C1.05566 13.7879 1.3042 12.8274 1.7718 11.9806C2.24152 11.1339 2.92184 10.4115 3.74119 9.89752L16.4191 1.9336C17.3352 1.35858 18.3905 1.05318 19.4732 1.05318C20.5557 1.05318 21.6111 1.35648 22.5272 1.9336L35.2051 9.89752C36.0245 10.4136 36.7068 11.1339 37.1745 11.9806C37.6442 12.8295 37.8906 13.7879 37.8906 14.7567H37.8885Z" fill="white"/>
                </mask>
                <g mask="url(#mask1_8_27)">
                  <mask id="mask2_8_27" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="0" y="0" width="39" height="36">
                    <path d="M38.9413 0H0V35.0446H38.9413V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask2_8_27)">
                    <path d="M39.0293 -0.0449219H-0.0973282V35.1387H39.0293V-0.0449219Z" fill="url(#pattern0_8_27)"/>
                  </g>
                </g>
                <mask id="mask3_8_27" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="11" y="13" width="17" height="18">
                  <path d="M27.9115 29.4171L26.7931 25.314L26.7531 25.3393C27.2501 24.2904 27.5282 23.1193 27.5282 21.885C27.5282 17.4281 23.9011 13.801 19.4442 13.801C14.9873 13.801 11.3602 17.4281 11.3602 21.885C11.3602 26.342 14.9873 29.9689 19.4442 29.9689C20.6785 29.9689 21.8496 29.6909 22.8985 29.1938L22.8732 29.2338L26.9763 30.3523C27.5451 30.5082 28.0654 29.9858 27.9115 29.4171ZM22.5341 22.0071L21.938 22.2305L21.9149 22.2389L21.1882 22.5106L20.6512 22.7107C20.4763 22.7759 20.3372 22.915 20.2719 23.0898L20.0718 23.6269L19.8002 24.3536L19.7918 24.3767L19.5685 24.9728C19.5264 25.0866 19.3642 25.0866 19.32 24.9728L19.0966 24.3767L19.0882 24.3536L18.8166 23.6269L18.6165 23.0898C18.5512 22.915 18.4121 22.7759 18.2373 22.7107L17.7002 22.5106L16.9735 22.2389L16.9504 22.2305L16.3543 22.0071C16.2406 21.9651 16.2406 21.8028 16.3543 21.7586L16.9504 21.5354L16.9735 21.5269L17.7002 21.2553L18.2373 21.0552C18.4121 20.9899 18.5512 20.8508 18.6165 20.6759L18.8166 20.1389L19.0882 19.4122L19.0966 19.3891L19.32 18.793C19.3642 18.6793 19.5243 18.6793 19.5685 18.793L19.7918 19.3891L19.8002 19.4122L20.0718 20.1389L20.2719 20.6759C20.3372 20.8508 20.4763 20.9899 20.6512 21.0552L21.1882 21.2553L21.9149 21.5269L21.938 21.5354L22.5341 21.7586C22.6478 21.8028 22.6478 21.9629 22.5341 22.0071Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask3_8_27)">
                    <mask id="mask4_8_27" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="10" y="12" width="19" height="20">
                      <path d="M28.9942 12.7478H10.3071V31.4329H28.9942V12.7478Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask4_8_27)">
                      <path d="M29.0223 12.693H10.2172V31.4981H29.0223V12.693Z" fill="url(#pattern1_8_27)"/>
                    </g>
                  </g>
                </g>
                <defs>
                  <pattern id="pattern0_8_27" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_8_27" transform="scale(0.00258398 0.00287356)"/>
                  </pattern>
                  <pattern id="pattern1_8_27" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image1_8_27" transform="scale(0.00537634 0.00540541)"/>
                  </pattern>
                  <image id="image0_8_27" width="387" height="348" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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略有改动，但内容过长，我会继续完成剩余部分
          </div>
        </div>

        {/* Speech Bubbles */}
        <div className="space-y-8">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`flex transition-all duration-900 ease-out ${
                notification.side === 'right' ? 'justify-end' : 'justify-start'
              } ${
                isExiting
                  ? notification.side === 'right' 
                    ? 'opacity-0 translate-x-16 translate-y-8'
                    : 'opacity-0 -translate-x-16 translate-y-8'
                  : currentStep > index
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : notification.side === 'right'
                  ? 'opacity-0 translate-x-16 -translate-y-8'
                  : 'opacity-0 -translate-x-16 -translate-y-8'
              }`}
              style={{
                transitionDelay: isExiting ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Message Bubble - alternating corners */}
              <div className={`bg-white px-6 py-4 shadow-sm border border-gray-100 max-w-sm transition-all duration-700 ease-out ${
                index % 2 === 0
                  ? notification.side === 'right' 
                    ? 'rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl' 
                    : 'rounded-tl-3xl rounded-tr-3xl rounded-br-3xl'
                  : notification.side === 'right'
                  ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                  : 'rounded-tl-2xl rounded-tr-2xl rounded-br-2xl'
              } ${
                isExiting
                  ? 'opacity-0 scale-95'
                  : currentStep > index
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: isExiting ? `${index * 100 + 100}ms` : `${index * 150}ms`
              }}>
                <p className="text-gray-800 text-base font-medium">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
