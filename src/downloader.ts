export const downloader = async (url: string): Promise<Buffer> => {
    try {
        const response = await fetch(url);
        // console.log(response)
        console.log(response.ok);

        if (!response.ok) {
            // throw new Error(
            //     `Received ${response.status} ${response.statusText} when trying to fetch ${url}`
            // );
            return Promise.reject(
                `Received ${response.status} ${response.statusText} when trying to fetch ${url}`
            );
        }

        const responseAsBuffer = Buffer.from(await response.arrayBuffer());

        return Promise.resolve(responseAsBuffer);
    } catch (error: unknown) {
        if (!(error instanceof Error)) {
            throw error;
        }

        console.log("we hit this");

        throw new Error(error.message);
        // return Promise.reject(error.message);
    }
};
