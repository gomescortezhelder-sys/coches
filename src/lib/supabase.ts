import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ?? "TU_URL_DE_SUPABASE";
const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ?? "TU_CLAVE_PUBLICA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
