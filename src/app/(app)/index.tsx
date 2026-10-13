import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

function OpcionMenu({
  icono,
  titulo,
  descripcion,
  onPress,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconoCaja}>
        <Text style={styles.icono}>{icono}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitulo}>{titulo}</Text>
        <Text style={styles.cardDescripcion}>{descripcion}</Text>
      </View>

      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

export default function Inicio() {
  const router = useRouter();
  const { session } = useAuth();
  const [mensaje, setMensaje] = useState("Conectando con Supabase...");
  const [cargando, setCargando] = useState(true);
  const [cerrandoSesion, setCerrandoSesion] = useState(false);

  useEffect(() => {
    const probarConexion = async () => {
      try {
        const { data, error } = await getSupabase()
          .from("clientes_coche")
          .select("id")
          .limit(1);

        if (error) {
          setMensaje(`Supabase conectado, pero hubo un error: ${error.message}`);
        } else {
          setMensaje(
            data && data.length > 0
              ? "Conectado. La tabla de reservas está disponible."
              : "Conectado. La tabla de reservas está disponible y todavía no tiene registros."
          );
        }
      } catch (error) {
        setMensaje(
          `Error de conexión: ${error instanceof Error ? error.message : String(error)}`
        );
      } finally {
        setCargando(false);
      }
    };

    probarConexion();
  }, []);

  const cerrarSesion = async () => {
    setCerrandoSesion(true);
    try {
      const { error } = await getSupabase().auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert(
        "No se pudo cerrar la sesión",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setCerrandoSesion(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.accountRow}>
        <Text style={styles.accountText}>{session?.user.email}</Text>
        <Pressable
          accessibilityRole="button"
          disabled={cerrandoSesion}
          onPress={cerrarSesion}
          style={[styles.logoutButton, cerrandoSesion && styles.logoutDisabled]}
        >
          <Text style={styles.logoutText}>
            {cerrandoSesion ? "Cerrando..." : "Cerrar sesión"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
          }}
          style={styles.imagenHero}
        />

        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>APEX PERFORMANCE</Text>
          <Text style={styles.titulo}>Luxury. Speed. Precision.</Text>
          <Text style={styles.subtitulo}>
            Descubre deportivos exclusivos con ingeniería de alto rendimiento.
          </Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <OpcionMenu
          icono="📝"
          titulo="Reserva de prueba"
          descripcion="Agenda una experiencia de manejo con un deportivo de tu elección."
          onPress={() => router.push("/formulario")}
        />

        <OpcionMenu
          icono="🚗"
          titulo="Galería premium"
          descripcion="Observa nuestras últimas entregas y modelos exclusivos."
          onPress={() => router.push("/imagenes")}
        />
      </View>

      <View style={styles.contactWrapper}>
        <OpcionMenu
          icono="📍"
          titulo="Contacto premium"
          descripcion="Consulta ubicación, horarios y atención personalizada."
          onPress={() => router.push("/contacto")}
        />
      </View>

      <OpcionMenu
        icono="📋"
        titulo="Mis registros"
        descripcion="Consulta las reservas asociadas al correo de tu cuenta."
        onPress={() => router.push("./registros")}
      />

      <View style={styles.actionsRow}>
        <OpcionMenu
          icono="🏎️"
          titulo="Modelos"
          descripcion="Conoce la colección disponible."
          onPress={() => router.push("/menu")}
        />
        <OpcionMenu
          icono="⚙️"
          titulo="Accesorios"
          descripcion="Explora equipamiento premium."
          onPress={() => router.push("/productos")}
        />
      </View>

      <View style={styles.supabaseBox}>
        {cargando ? (
          <View style={styles.supabaseLoading}>
            <ActivityIndicator color="#f5d0a9" />
            <Text style={styles.supabaseText}>{mensaje}</Text>
          </View>
        ) : (
          <Text style={styles.supabaseText}>{mensaje}</Text>
        )}
      </View>

      <Text style={styles.footer}>Apex Performance · Atelier Motors</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#05070b",
    padding: 18,
  },
  accountRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  accountText: {
    color: "#cbd5e1",
    flex: 1,
    fontSize: 13,
    marginRight: 12,
  },
  logoutButton: {
    backgroundColor: "#8e3b46",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  logoutDisabled: { opacity: 0.6 },
  logoutText: { color: "#ffffff", fontSize: 13, fontWeight: "700" },
  hero: {
    height: 300,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#3b3f46",
  },
  imagenHero: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 22,
    backgroundColor: "rgba(5, 7, 11, 0.72)",
  },
  etiqueta: {
    color: "#f5d0a9",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 6,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitulo: {
    color: "#e5e7eb",
    fontSize: 14,
    lineHeight: 21,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  contactWrapper: {
    alignItems: "center",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#101827",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2f3b4d",
    elevation: 2,
    flex: 1,
  },
  iconoCaja: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#1a2332",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icono: {
    fontSize: 26,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#f8fafc",
    marginBottom: 4,
  },
  cardDescripcion: {
    color: "#d1d5db",
    fontSize: 13,
    lineHeight: 18,
  },
  flecha: {
    fontSize: 30,
    color: "#f5d0a9",
    marginLeft: 8,
  },
  supabaseBox: {
    backgroundColor: "#101827",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#2f3b4d",
    padding: 14,
    marginBottom: 20,
  },
  supabaseLoading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  supabaseText: {
    color: "#e5e7eb",
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 12,
  },
});
