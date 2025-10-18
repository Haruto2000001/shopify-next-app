"use client";
import { useState } from "react";
import { supabase } from "@/lib/db/supabaseClient";


export default function Home() {
    const [accessToken, setAccessToken] = useState("")
    const [fetchError, setFetchError] = useState("")

    const fetchAccessToken = async () => {
        const { data, error } = await supabase.from("shop_token").select("*").single()

        if (error) {
            setFetchError(error.message)
        } else {
            setAccessToken(data.access_token)
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