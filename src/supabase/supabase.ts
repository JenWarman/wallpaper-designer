import supabase from "./supabaseClient";
import type { NewUser } from "../types/types";

export async function signUpAndCreateAccount(newUser: NewUser) {
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

  const userId = signUpData.user?.id;

  const { data: accountData, error: accountError } = await supabase
    .from("usersAccount")
    .insert({
      user_id: userId,
      username: newUser.username,
    });
  if (accountError) {
    return { success: false, accountError };
  }
  return {
    success: true,
    user: signUpData,
    account: accountData,
  };
}

export async function fetchUsers() {
  const { data, error } = await supabase.from("usersAccount").select();
  if (error) {
    return { success: false, error };
  }
  return { success: true, data };
}

export async function fetchUserById() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("usersAccount")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  }
}

export async function updateOrderByUserId(quantity: number, price: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from("orders").insert({
      user_id: user.id,
      quantity,
      price,
    });
    if (error) {
      return { success: false, error };
    }
    return {
      success: true,
      orders: data,
    };
  }
}

export async function fetchOrderByUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  }
}

export async function loginAndStartSession(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { success: false, error };
  }
  console.log("user signed in with id: ", data.user.id);
  return {
    success: true,
    user: data.user,
  };
}

export async function saveDesignByUserId(design_url: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase.from("designs").insert({
      user_id: user.id,
      design_url,
    });

    if (error) {
      return { success: false, error };
    }

    return {
      success: true,
      design: data,
    };
  }
}
