import { getSupabase } from "@/lib/supabase";
import type { Session, Subscription } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type AuthContextValue = {
  session: Session | null;
  cargando: boolean;
  error: string | null;
  reloadSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const SESSION_RESTORE_TIMEOUT_MS = 15_000;

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function withSessionTimeout<T>(operation: Promise<T>) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    timeoutId = setTimeout(
      () =>
        reject(
          new Error(
            "La conexión de Supabase tardó demasiado. Comprueba tu conexión e inténtalo de nuevo."
          )
        ),
      SESSION_RESTORE_TIMEOUT_MS
    );
  });

  try {
    return await Promise.race([operation, timeout]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reloadSession = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const { data, error: sessionError } = await withSessionTimeout(
        getSupabase().auth.getSession()
      );
      if (sessionError) {
        throw sessionError;
      }
      setSession(data.session);
    } catch (sessionLoadError) {
      setError(getErrorMessage(sessionLoadError));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let subscription: Subscription | undefined;
    let receivedAuthEvent = false;

    const restoreSession = async () => {
      try {
        const supabase = getSupabase();
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
          receivedAuthEvent = true;
          setSession(nextSession);
          setError(null);
          setCargando(false);
        });
        subscription = authListener.subscription;

        const { data, error: sessionError } = await withSessionTimeout(
          supabase.auth.getSession()
        );
        if (sessionError) {
          throw sessionError;
        }
        if (!receivedAuthEvent) {
          setSession(data.session);
        }
        setError(null);
      } catch (sessionLoadError) {
        setError(getErrorMessage(sessionLoadError));
      } finally {
        setCargando(false);
      }
    };

    void restoreSession();
    return () => subscription?.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, cargando, error, reloadSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }
  return context;
}
