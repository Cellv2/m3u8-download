import { M3U8_CONTENT_TYPE } from "./constants/content-type.consts";

// TODO: remove null
export const validateisM3u8 = async (filePath: string): Promise<boolean | null> => {


    return null;
};

export const validateResponseHasM3u8ContentType = (res: Response): boolean => {
    // const response = await fetch(url);

    // return response.headers.get("content-type") === M3U8_CONTENT_TYPE
    return res.headers.get("content-type") === M3U8_CONTENT_TYPE
    // return null;
}
