import { supabase } from "@/lib/db/supabaseClient";
import Home from "./components/Home";

interface Data {
  shop_id: number;
  access_token: string;
}

export default async function Page(props: {
  params: Promise<any>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

  const { data, error } = await supabase.from("shop_token").select("*").single()
  console.log(data)
  const params = await props.searchParams;

  return (
    <>
      <h1>Shop: {params.shop}, Host: {params.host}</h1>
      <Home />
    </>
  );
}
