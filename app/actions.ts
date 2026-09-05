"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MorePlant } from "./plant-details/[slug]/page"


export async function addFavourite( plant: MorePlant){
    const supabase = await createClient();
    const{
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    if (await plantFavouritedCheck(plant.slug)){
        return
    }
    if (!await plantSavedCheck(plant.slug)){
        const {error} = await supabase.from("SavedPlants").insert({
            slug: plant.slug,
            info: plant,
        });
        if (error){
            throw new Error(error.message);
        }
    }

    const {error} = await supabase.from("FavouritePlants").insert({
        user_id: user.id,
        plant_slug: plant.slug,
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


export async function plantFavouritedCheck (slug: string){
    const supabase = await createClient();
    const{
        data: {user},
    } = await supabase.auth.getUser();
    if (!user){return false}
    const {data, error} = await supabase.from("FavouritePlants").select("plant_slug").eq("plant_slug", slug).eq("user_id", user.id).maybeSingle();
    if (error){ throw new Error(error.message);}
    return data!==null;
}
