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

export async function getUserSession() {
  const {data, error} = await supabase.auth.getSession()

  if (error) {
    return {
      success: false, error
    }
  }
  if (data.session?.user) {
    return {
      success: true,
      user_id: data.session.user.id,
      username: data.session.user.user_metadata.username
    }
  }
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

export async function updateOrderByUserId(
  quantity: number,
  price: number,
  design: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        quantity,
        price,
        design,
      })
      .select()
      .single();
    if (error) {
      return { success: false, error };
    }
    const statusData = await updateProgressStatus({
      design: design,
      status: "ordered",
      user_id: user.id,
    });
    return {
      success: true,
      orders: data,
      status: statusData,
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
  return {
    success: true,
    user: data.user,
  };
}

export async function createDesignByUserId(design_url: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: designData, error: designError } = await supabase
      .from("designs")
      .insert({
        user_id: user.id,
        design_url,
      })
      .select()
      .single();

    if (designError) {
      return { success: false, designError };
    }
    const statusData = await updateProgressStatus({
      design: designData.design_url,
      status: "saved",
      user_id: user.id,
    });

    return { success: true, design: designData, status: statusData };
  }
}

export async function fetchDesignsByUserId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("designs")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  }
}

export async function updateProgressStatus({
  design,
  status,
  user_id,
}: {
  design: string;
  status: string;
  user_id: string;
}) {
  const { data: statusData, error: statusError } = await supabase
    .from("progressStatus")
    .insert({
      design,
      user_id,
      status,
    })
    .select()
    .single();
  if (statusError) {
    return { success: false, statusError };
  }
  return { success: true, status: statusData.status };
}

export async function fetchProgressStatusByDesign(design: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase
      .from("progressStatus")
      .select("*")
      .eq("design", design);
    if (error) {
      return { success: false, error };
    }
    return { success: true, status: data };
  }
}
