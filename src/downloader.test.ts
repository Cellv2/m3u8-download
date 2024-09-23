import fs from "fs";
import { m3u8FilePath } from "./__tests__/setup/express";
import { downloader } from "./downloader";
import { createFakeResponse } from "./__fakes__/fake-response";

// jest.mock('fetch', ()=>jest.fn())


describe("downloader", () => {
    it("should download the correct m3u8 at the link provided", async () => {
        const downloaded = await downloader(`http://localhost:3000/m3u8`);

        const fileAsBuffer = await fs.promises.readFile(m3u8FilePath);
        expect(fileAsBuffer.equals(downloaded));
    });

    it("should throw if the link is invalid", async () => {
        const url = "wrong";
        const downloadedFunc = downloader(url);

        await expect(downloadedFunc).rejects.toThrow(
            TypeError(`Failed to parse URL from ${url}`)
        );
    });

    it("should throw if response is not ok", async () => {
        // just want this here for now
        // enableFetchMocks();


        // https://medium.com/fernandodof/how-to-mock-fetch-calls-with-jest-a666ae1e7752


        const fR = {
            headers: new Headers(),
            ok: false,
            redirected: false,
            status: 0,
            statusText: "",
            type: "basic",
            url: "",
            clone: function (): Response {
                throw new Error("Function not implemented.");
            },
            body: null,
            bodyUsed: false,
            arrayBuffer: function (): Promise<ArrayBuffer> {
                throw new Error("Function not implemented.");
            },
            blob: function (): Promise<Blob> {
                throw new Error("Function not implemented.");
            },
            formData: function (): Promise<FormData> {
                throw new Error("Function not implemented.");
            },
            json: function (): Promise<any> {
                throw new Error("Function not implemented.");
            },
            text: function (): Promise<string> {
                throw new Error("Function not implemented.");
            },
        };


        const fetchMock = jest.spyOn(global, "fetch");
        const fakeResponse = createFakeResponse();
        const x = () => Promise.resolve(fakeResponse);
        // fetchMock.mockImplementation(x)
        const y: Partial<Response> = {
            ok: false,
        };


        // const mockedFetchError = new Error('some error');
        // (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(fR);

        fetchMock.mockResolvedValue(fakeResponse)



        const response = downloader("");
        console.log(response)
        await expect(response).rejects.toThrow();
        expect(fetchMock).toHaveBeenCalledTimes(1);



        // fetchMock.mockImplementation(
        //     jest.fn(() =>
        //         Promise.resolve(y)
        //     ) as jest.Mock
        // );

        // fetchMock.mockImplementation(
        //     jest.fn(() =>
        //         Promise.reject(fakeResponse)
        //     ) as jest.Mock
        // );

        // fetchMock.mockImplementation(() => Promise.reject(fakeResponse))

        // fetchMock.mockResolvedValueOnce(fakeResponse)



        // fetchMock.mockRejectedValueOnce(fakeResponse)




        // const result = downloader("");
        // console.log(await result);

        // await expect(result).rejects.toThrow();
        // expect(fetchMock).toHaveBeenCalledTimes(1);
        // fetchMock.mockRestore();

        // fetchMock.resetMocks()
        // disableFetchMocks()
    });
});
