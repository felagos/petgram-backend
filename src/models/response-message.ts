export class ResponseMessage<T> {

    constructor(public code: number, public data: T) { }

}
