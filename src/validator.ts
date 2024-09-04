import { M3U8_CONTENT_TYPE } from "./constants/content-type.consts";
import { getFirstLineFromFile } from "./utils/file.utils";

// TODO: remove null
// TODO: check for 0 length file
export const validateFileisM3u8 = async (
    filePath: string
): Promise<boolean> => {
    try {
        const firstLine = await getFirstLineFromFile(filePath);

        if (firstLine !== "#EXTM3U") {
            return false;
        }

        return true;
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        throw new Error(error.message);
    }
};

export const validateResponseHasM3u8ContentType = (res: Response): boolean => {
    const responseHasCorrectContentType =
        res.headers.get("content-type") === M3U8_CONTENT_TYPE;
    return responseHasCorrectContentType;
};
