'use server';

import { revalidatePath, revalidateTag } from "next/cache";

export const customRevalidateTag = (tag) => {
    revalidateTag(tag)
}
export const customRevalidatePath = (path) => {
    console.log('path customRevalidatePath', path)
    revalidatePath(path)
}


// import { cookies } from 'next/headers'
// import { setCookie, deleteCookie } from 'cookies-next';

// export async function CookiesDelete(name) {
//     'use server'
//     console.log('name', name)
    
//      deleteCookie(name, { cookies });
// }
// export async function CookiesSet(name, value, options) {
//     'use server'
//     setCookie(name, value, {...options, cookies });
// }

