import supabase from "./supabaseClient";

export async function registerUser({ newUser, event }) {
  event.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        username: newUser.username,
      },
    },
  });
  if (error) {
    return { success: false, error };
  }
  console.log("successfully signedup!", data)
  return { success: true, data };
}
