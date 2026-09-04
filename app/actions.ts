"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function addFavourite( slug: string){
    const supabase = await createClient();
    const{
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    if (!await plantSavedCheck(slug)){
        const {error} = await supabase.from("SavedPlants").insert({
            slug: slug,
            info: "temporary placeholder",
        });
        if (error){
            throw new Error(error.message);
        }
    }

    const {error} = await supabase.from("FavouritePlants").insert({
        user_id: user.id,
        plant_slug: slug,
    });
    if (error){
        throw new Error(error.message);
    }
}

export async function plantSavedCheck (slug: string){
    const supabase = await createClient();
    const { data, error} = await supabase.from("SavedPlants").select("slug").eq("slug", slug).maybeSingle();
    if (error){
        throw new Error(error.message);
    }

    return data!==null;
}