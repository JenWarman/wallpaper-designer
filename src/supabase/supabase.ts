import supabase from "./supabaseClient";

export async function registerUser({newUser}) {
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
      console.log(error);
    } else {
      console.log("New User Added", data);
    }
  }