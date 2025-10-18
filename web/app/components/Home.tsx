"use client";
import { useState } from "react";
import { supabase } from "@/lib/db/supabaseClient";


type Data = {
    shop_id: number;
    access_token: string;
};

type APIResponse<DataType> = {
    status: "success" | "error";
    data?: DataType;
    message?: string;
};

export default function Home() {
    const [accessToken, setAccessToken] = useState("")
    const [fetchError, setFetchError] = useState("")

    const fetchAccessToken = async () => {
        console.log("ボタンが押されました。")
        try {
            const res = await fetch("/api/supabase")
            const result: APIResponse<Data> = await res.json();

            if (result.status === "success" && result.data) {
                setAccessToken(result.data.access_token);
            } else {
                setFetchError(result.message || "Error fetching token");
            }
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <>
            <h1>Access Token</h1>
            <button onClick={fetchAccessToken}>GET!</button>
            {accessToken ? (
                <p>Access Token : {accessToken}</p>
            ) : (
                <p>???</p>
            )}
            {fetchError && (
                <p>{fetchError}</p>
            )}
        </>
    )
}