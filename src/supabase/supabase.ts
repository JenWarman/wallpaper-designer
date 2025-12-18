import supabase from "./supabaseClient";

export async function registerUser({ newUser}) {

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
  console.log("successfully signedup!", data);
  return { success: true, data };
}

export async function createUserAccount({newUser}) {

  const { data, error } = await supabase.from("usersAccount").insert({
    username: newUser.username,
    designs: [],
    orders: [],
    progress_status: "design",
  });

  if (error) {
    return { success: false, error };
  }
  console.log("new user account has been created", data);
  return { success: true, data };
}

export async function fetchUsers() {
  const { data, error } = await supabase.from('usersAccount').select()
   if (error) {
    return { success: false, error };
  }
  console.log("user data", data);
  return { success: true, data };
}
