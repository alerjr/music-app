import { supabase } from '../supabase';

export const fetchAlbums = async () => {

    const { data, error } = await supabase

        .from('music-app')

        .select('*');
    if (error) throw error;
    return data;

};

export const createAlbum = async (albumItem) => {
    const artist = albumItem.artists[0]?.name || ''
    const album = albumItem.name || ''
    const album_year = albumItem.release_date?.slice(0, 4) || ''
    const album_id = albumItem.id || ''
    const img = albumItem.images[0]?.url || ''
    const favorite = false

    const { data, error } = await supabase
        .from('music-app')
        .insert([{ artist, album, album_year, album_id, img, favorite }])

    if (error) throw error
    return data
}

export const favoriteAlbum = async (id, favoritedTasks) => {
    const { data, error } = await supabase
        .from("music-app")
        .update({
            ...favoritedTasks,
        })
        .eq('id', id);

    if (error) throw error;
    return data;
}

export const deleteAlbum = async (id) => {
    const { data, error } = await supabase
        .from("music-app")
        .delete()
        .eq('id', id);

    if (error) throw error;
    return data;
}