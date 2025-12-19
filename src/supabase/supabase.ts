import supabase from "./supabaseClient";
import type { NewUser } from "../types/types";

export async function signUpAndCreateAccount(newUser:NewUser) {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        username: newUser.username,
      },
    },
  });
  if (signUpError || !signUpData) {
    return { success: false, signUpError };
  }

  const userId = signUpData.user?.id

  const { data: accountData, error:accountError } = await supabase.from("usersAccount").insert({
    user_id: userId,
    username: newUser.username,
    designs: [],
    orders: [],
  });
if (accountError) {
    return { success: false, accountError };
  }
  return {
    success: true,
    user: signUpData,
    account: accountData
  }
}

export async function fetchUsers() {
  const { data, error } = await supabase.from('usersAccount').select()
   if (error) {
    return { success: false, error };
  }
  console.log("all user data", data);
  return { success: true, data };
}

export async function fetchUserById(userId: string) {
    const {data, error} = await supabase.from('usersAccount').select("*").eq('user_id', userId)
    if (error) {
    return { success: false, error };
  }
  console.log("user data", data);
  return { success: true, data };
}

export async function updateOrderByUserId(user_id: string, quantity: number, price: number ) {
   const { data, error } = await supabase.from("orders").insert({
    user_id: user_id,
    quantity,
    price,
  });
if (error) {
    return { success: false, error };
  }
  return {
    success: true,
    orders: data
  }

}

