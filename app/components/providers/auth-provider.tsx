"use client";
import type React from "react";
import {
  useState,
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
} from "react";
import api from "@/lib/api";

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  authToken: string | null;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUser = () => {
    setIsLoading(true);
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setAuthToken(null);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const login = (email: string, password: string) => {
    return api
      .post("/auth/login", { email, password })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setAuthToken(null);
        setUser(null);
        throw err;
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config: any) => {
      config.headers.Authorization =
        !config._retry && authToken
          ? `Bearer ${authToken}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [authToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes("/auth/refresh")) {
          console.error("Refresh token expired or invalid");
          setAuthToken(null);
          setUser(null);
          return Promise.reject(error);
        }

        if (
          !originalRequest._retry &&
          error.response?.status === 401 &&
          error.response?.data?.error === "Unauthorized"
        ) {
          return api
            .post("/auth/refresh")
            .then((response) => {
              setAuthToken(response.data.authToken);
              originalRequest.headers.Authorization = `Bearer ${response.data.authToken}`;
              originalRequest._retry = true;
              return api(originalRequest);
            })
            .catch(() => {
              setAuthToken(null);
              return Promise.reject(error);
            });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return authContext;
};
