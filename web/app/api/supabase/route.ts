import { NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabaseClient";

export type APIResponse<DataType> = {
  status: "success" | "error";
  data?: DataType;
  message?: string;
};

type Data = {
  shop_id: number;
  access_token: string;
};

export async function GET(req: Request) {
  // session token is located in the request headers
  const { data, error } = await supabase
    .from("shop_token")
    .select("*")
    .single();

  return NextResponse.json<APIResponse<Data>>({
    status: "success",
    data: {
      shop_id: data.shop_id,
      access_token: data.access_token,
    },
  });
}
