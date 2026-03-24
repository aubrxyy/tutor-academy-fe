import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AppRole =
  | "student"
  | "tutor"
  | "admin"
  | "founder"
  | "co-founder";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AppRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginAs: (role: AppRole) => void;
  logout: () => void;
  hasRole: (...roles: AppRole[]) => boolean;
}

const AUTH_STORAGE_KEY = "tutor-academy.auth";

const ROLE_PROFILES: Record<AppRole, AuthUser> = {
  student: {
    id: "student-demo",
    name: "Ahmad Wijaya",
    email: "student@tutoracademy.test",
    role: "student",
  },
  tutor: {
    id: "tutor-demo",
    name: "Raka Pratama",
    email: "tutor@tutoracademy.test",
    role: "tutor",
  },
  admin: {
    id: "admin-demo",
    name: "Admin Platform",
    email: "admin@tutoracademy.test",
    role: "admin",
  },
  founder: {
    id: "founder-demo",
    name: "Founder Access",
    email: "founder@tutoracademy.test",
    role: "founder",
  },
  "co-founder": {
    id: "cofounder-demo",
    name: "Co-Founder Access",
    email: "cofounder@tutoracademy.test",
    role: "co-founder",
  },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readPersistedUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as AuthUser;
    if (parsedValue?.role && parsedValue.role in ROLE_PROFILES) {
      return parsedValue;
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
}

export function getDefaultDashboardPath(role: AppRole) {
  switch (role) {
    case "student":
      return "/student-dashboard";
    case "tutor":
      return "/tutor-dashboard";
    case "admin":
    case "founder":
    case "co-founder":
      return "/admin-dashboard";
  }
}

export const availableRoles: AppRole[] = [
  "student",
  "tutor",
  "admin",
  "founder",
  "co-founder",
];

export function getRoleLabel(role: AppRole) {
  switch (role) {
    case "student":
      return "Student";
    case "tutor":
      return "Tutor";
    case "admin":
      return "Admin";
    case "founder":
      return "Founder";
    case "co-founder":
      return "Co-Founder";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readPersistedUser());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return;
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [user]);

  const loginAs = (role: AppRole) => {
    setUser(ROLE_PROFILES[role]);
  };

  const logout = () => {
    setUser(null);
  };

  const hasRole = (...roles: AppRole[]) => {
    if (!user) {
      return false;
    }

    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        loginAs,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
