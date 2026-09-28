import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { supabase } from "../lib/supabase";

type Reserva = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  ciudad: string;
};

export default function Registros() {
  const [registros, setRegistros] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    setCargando(true);

    const { data, error } = await supabase
      .from("clientes_coches")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      setCargando(false);
      return;
    }

    setRegistros((data as Reserva[]) || []);
    setCargando(false);
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#C87591" />
        <Text style={styles.cargandoTexto}>Consultando Supabase...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reservas registradas</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.texto}>{item.correo}</Text>
            <Text style={styles.texto}>Teléfono: {item.telefono}</Text>
            <Text style={styles.texto}>Ciudad: {item.ciudad}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.vacioTexto}>No hay reservas todavía.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8FB",
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8FB",
  },
  cargandoTexto: {
    marginTop: 12,
    color: "#6B4234",
    fontSize: 14,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6B4234",
    textAlign: "center",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F2D8E1",
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#6B4234",
    marginBottom: 5,
  },
  texto: {
    fontSize: 14,
    color: "#5B4036",
    marginBottom: 2,
  },
  vacio: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F2D8E1",
  },
  vacioTexto: {
    color: "#6B4234",
    fontWeight: "600",
  },
});
