import { useAuth } from "@/context/AuthContext";
import { getSupabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

type RegistroCliente = {
  id: number | string;
  nombre: string;
  correo: string;
  telefono: string;
  ciudad: string;
};

export default function Registros() {
  const { session } = useAuth();
  const [registros, setRegistros] = useState<RegistroCliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    const cargarRegistros = async () => {
      setCargando(true);
      setError(null);
      try {
        const correo = session?.user.email;
        if (!correo) {
          throw new Error("La sesión no contiene un correo para filtrar los registros.");
        }

        const { data, error: queryError } = await getSupabase()
          .from("clientes_coches")
          .select("id,nombre,correo,telefono,ciudad")
          .eq("correo", correo)
          .order("id", { ascending: false });

        if (queryError) {
          throw queryError;
        }
        if (activo) {
          setRegistros(data ?? []);
        }
      } catch (queryError) {
        if (activo) {
          setError(
            queryError instanceof Error ? queryError.message : String(queryError)
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    void cargarRegistros();
    return () => {
      activo = false;
    };
  }, [session?.user.email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mis registros</Text>
      <Text style={styles.subtitle}>
        Reservas asociadas al correo de tu sesión: {session?.user.email}
      </Text>

      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          El filtro por correo ayuda a mostrar tus reservas, pero la protección real de los datos
          debe configurarse con políticas RLS en Supabase.
        </Text>
      </View>

      {cargando ? (
        <View style={styles.stateCard}>
          <ActivityIndicator color="#f5d0a9" />
          <Text style={styles.stateText}>Cargando registros...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorCard} accessibilityRole="alert">
          <Text style={styles.errorTitle}>No se pudieron cargar los registros</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : registros.length === 0 ? (
        <View style={styles.stateCard}>
          <Text style={styles.stateText}>Todavía no hay reservas para este correo.</Text>
        </View>
      ) : (
        registros.map((registro) => (
          <View key={registro.id} style={styles.card}>
            <Text style={styles.cardTitle}>{registro.nombre}</Text>
            <Text style={styles.detail}>{registro.correo}</Text>
            <Text style={styles.detail}>{registro.telefono}</Text>
            <Text style={styles.detail}>{registro.ciudad}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#0b1020", padding: 20 },
  title: { color: "#f8fafc", fontSize: 28, fontWeight: "800", marginBottom: 6 },
  subtitle: { color: "#cbd5e1", fontSize: 14, lineHeight: 21, marginBottom: 16 },
  notice: {
    backgroundColor: "#252033",
    borderColor: "#51415d",
    borderRadius: 14,
    borderWidth: 1,
    padding: 13,
    marginBottom: 16,
  },
  noticeText: { color: "#e7d9ec", fontSize: 12, lineHeight: 18 },
  stateCard: {
    alignItems: "center",
    backgroundColor: "#111827",
    borderColor: "#374151",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 18,
  },
  stateText: { color: "#cbd5e1", flex: 1, fontSize: 14, lineHeight: 20 },
  errorCard: {
    backgroundColor: "#321b25",
    borderColor: "#8d4256",
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
  },
  errorTitle: { color: "#fecdd3", fontSize: 15, fontWeight: "700", marginBottom: 7 },
  errorText: { color: "#f3c4cf", fontSize: 13, lineHeight: 20 },
  card: {
    backgroundColor: "#111827",
    borderColor: "#374151",
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    padding: 18,
  },
  cardTitle: { color: "#f8fafc", fontSize: 17, fontWeight: "700", marginBottom: 8 },
  detail: { color: "#cbd5e1", fontSize: 14, lineHeight: 22 },
});
