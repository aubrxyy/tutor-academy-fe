import { gql } from "@apollo/client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { apolloClient } from "../api/graphql";
import { readAuthSession, writeAuthSession, type AuthSession } from "../api/session";

export type AppRole = "student" | "tutor" | "admin";
type BackendRole = "USER" | "TUTOR" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
  email: string;
  role: AppRole;
  contact: string | null;
}

interface AuthContextValue {
  session: AuthSession | null;
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (input: LoginCredentials) => Promise<AuthUser>;
  register: (input: RegisterCredentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
  hasRole: (...roles: AppRole[]) => boolean;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      id
      name
      avatarUrl
      username
      email
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      id
      name
      avatarUrl
      username
      email
    }
  }
`;

const GET_AUTH_USER = gql`
  query GetAuthUser($userId: String!) {
    users(where: { id: { eq: $userId } }) {
      id
      name
      username
      avatarUrl
      email
      role
      contact
      enrolledCourses
      teachingCourses
    }
  }
`;

interface LoginData {
  login: {
    token: string;
    id: string;
    name: string;
    avatarUrl: string | null;
    username: string;
    email: string;
  };
}

interface RegisterData {
  register: {
    token: string;
    id: string;
    name: string;
    avatarUrl: string | null;
    username: string;
    email: string;
  };
}

interface AuthUserData {
  users: Array<{
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
    email: string;
    role: BackendRole;
    contact: string | null;
  }>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapBackendRole(role: BackendRole): AppRole {
  switch (role) {
    case "ADMIN":
      return "admin";
    case "TUTOR":
      return "tutor";
    case "USER":
      return "student";
  }
}

export function getDefaultDashboardPath(role: AppRole) {
  switch (role) {
    case "student":
      return "/student-dashboard";
    case "tutor":
      return "/tutor-dashboard";
    case "admin":
      return "/admin-dashboard";
  }
}

export const availableRoles: AppRole[] = ["student", "tutor", "admin"];

export function getRoleLabel(role: AppRole) {
  switch (role) {
    case "student":
      return "Student";
    case "tutor":
      return "Tutor";
    case "admin":
      return "Admin";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() =>
    readAuthSession(),
  );
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Load user data when session exists
  useEffect(() => {
    const loadUser = async () => {
      const currentSession = readAuthSession();
      if (!currentSession?.token || !currentSession?.userId) {
        setIsLoadingUser(false);
        return;
      }

      try {
        const userResult = await apolloClient.query<AuthUserData>({
          query: GET_AUTH_USER,
          variables: {
            userId: currentSession.userId,
          },
          context: {
            headers: {
              authorization: `Bearer ${currentSession.token}`,
            },
          },
          fetchPolicy: "network-only",
        });

        const backendUser = userResult.data?.users?.[0];
        if (backendUser) {
          setUser({
            id: backendUser.id,
            name: backendUser.name,
            username: backendUser.username,
            avatarUrl: backendUser.avatarUrl,
            email: backendUser.email,
            role: mapBackendRole(backendUser.role),
            contact: backendUser.contact,
          });
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        // Clear invalid session
        writeAuthSession(null);
        setSession(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  const login = async ({ username, password }: LoginCredentials) => {
    const loginResult = await apolloClient.mutate<LoginData>({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          username,
          password,
        },
      },
    });

    const loginResponse = loginResult.data?.login;

    if (!loginResponse?.token) {
      throw new Error("Login response did not include a token.");
    }

    const userResult = await apolloClient.query<AuthUserData>({
      query: GET_AUTH_USER,
      variables: {
        userId: loginResponse.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${loginResponse.token}`,
        },
      },
      fetchPolicy: "network-only",
    });

    const backendUser = userResult.data?.users?.[0];

    if (!backendUser) {
      throw new Error("Authenticated user profile could not be loaded.");
    }

    const authUser: AuthUser = {
      id: backendUser.id,
      name: backendUser.name,
      username: backendUser.username,
      avatarUrl: backendUser.avatarUrl,
      email: backendUser.email,
      role: mapBackendRole(backendUser.role),
      contact: backendUser.contact,
    };

    const nextSession: AuthSession = {
      token: loginResponse.token,
      userId: backendUser.id,
    };

    writeAuthSession(nextSession);
    setSession(nextSession);
    setUser(authUser);
    await apolloClient.resetStore();

    return authUser;
  };

  const register = async ({ name, email, username, password }: RegisterCredentials) => {
    const registerResult = await apolloClient.mutate<RegisterData>({
      mutation: REGISTER_MUTATION,
      variables: {
        input: {
          name,
          email,
          username,
          password,
        },
      },
    });

    const registerResponse = registerResult.data?.register;

    if (!registerResponse?.token) {
      throw new Error("Registration response did not include a token.");
    }

    const userResult = await apolloClient.query<AuthUserData>({
      query: GET_AUTH_USER,
      variables: {
        userId: registerResponse.id,
      },
      context: {
        headers: {
          authorization: `Bearer ${registerResponse.token}`,
        },
      },
      fetchPolicy: "network-only",
    });

    const backendUser = userResult.data?.users?.[0];

    if (!backendUser) {
      throw new Error("Authenticated user profile could not be loaded.");
    }

    const authUser: AuthUser = {
      id: backendUser.id,
      name: backendUser.name,
      username: backendUser.username,
      avatarUrl: backendUser.avatarUrl,
      email: backendUser.email,
      role: mapBackendRole(backendUser.role),
      contact: backendUser.contact,
    };

    const nextSession: AuthSession = {
      token: registerResponse.token,
      userId: backendUser.id,
    };

    writeAuthSession(nextSession);
    setSession(nextSession);
    setUser(authUser);
    await apolloClient.resetStore();

    return authUser;
  };

  const logout = async () => {
    writeAuthSession(null);
    setSession(null);
    setUser(null);
    await apolloClient.clearStore();
  };

  const value = useMemo<AuthContextValue>(() => {
    const hasRole = (...roles: AppRole[]) => {
      if (!user) {
        return false;
      }

      return roles.includes(user.role);
    };

    return {
      session,
      token: session?.token ?? null,
      user,
      isAuthenticated: Boolean(session?.token && user),
      login,
      register,
      logout,
      hasRole,
    };
  }, [session, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
