import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login');
    } else if (!authentication && authStatus !== authentication) {
      navigate('/');
    }
    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-neutral-800"></div>
        
        <p className="animate-pulse text-sm font-medium tracking-wide text-neutral-500">
          Authenticating...
        </p>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}