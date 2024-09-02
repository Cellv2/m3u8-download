// https://nodejs.org/api/errors.html#class-systemerror
export class SystemError extends Error {
    readonly errorCode: string;
    readonly errorNumber: number;

    constructor(errorMessage: string, errorCode: string, errorNumber: number) {
        super(errorMessage);

        // https://github.com/microsoft/TypeScript-wiki/blob/81fe7b91664de43c02ea209492ec1cea7f3661d0/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, SystemError.prototype);

        this.errorCode = errorCode;
        this.errorNumber = errorNumber;
    }
}
