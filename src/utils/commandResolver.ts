import commandExists from "command-exists-promise";

export const isCommandAvailable = async (
    command: string = "ffmpeg"
): Promise<boolean> => {
    try {
        const doesCommandExist = await commandExists(command);

        return Promise.resolve(doesCommandExist);
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        return Promise.reject(error);
    }
};
