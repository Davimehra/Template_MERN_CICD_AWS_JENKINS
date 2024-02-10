export default abstract class StatusCode {
    static statusMessage: string;
    static statusCode: number;
    static shortMessage: string

    constructor(public shortMessage: string) {
        this.shortMessage = shortMessage;
    }
}

export class Ok200 extends StatusCode {
    static statusMessage: string = `The HTTP 200 OK success status response code indicates that the request has succeeded. 
    A 200 response is cacheable by default.`
    static statusCode: number = 200;
    static shortMessage: string = "Successfull, Response OK";

    constructor(message: string) {
        super(message)
    }
}

export class Created201 extends StatusCode {
    static statusMessage: string = `The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource. 
    The new resource, or a description and link to the new resource, 
    is effectively created before the response is sent back and the newly created items are returned in the body of the message,
     located at either the URL of the request`
    static statusCode: number = 201;
    static shortMessage: string = "Successfull, Data Created ";
    constructor(message: string) {
        super(message)
    }
}


export class Accepted202 extends StatusCode {
    static statusMessage: string = `202 Accepted response status code indicates that the request has been accepted for processing, 
    but the processing has not been completed; in fact, processing may not have started yet. 
    The request might or might not eventually be acted upon, 
    as it might be disallowed when processing actually takes place`
    static statusCode: number = 202;
    static shortMessage: string = "Successfull, Accepted and Under Process.."

    constructor(message: string) {
        super(message)
    }
}

export class NonAuthoritiveInfo203 extends StatusCode {
    static statusMessage: string = ` The HTTP 203 Non-Authoritative Information response status indicates 
    that the request was successful but the enclosed payload has been modified by a transforming proxy 
    from that of the origin server's 200 (OK) response.
    The 203 response is similar to the value 214, meaning Transformation Applied,`
    static statusCode: number = 203;
    static shortMessage: string = "Successfull, Transfomation Applied to Payload via Proxy Origin Server";
    constructor(message: string) {
        super(message)
    }
}

export class NoContent204 extends StatusCode {
    static statusMessage: string = ` The HTTP 204 No Content success status response code indicates that a request has succeeded, 
    but that the client doesn't need to navigate away from its current page.
    This might be used, for example, when implementing "save and continue editing" 
    functionality for a wiki site. In this case a PUT request would be used to save the page, 
    and the 204 No Content response would be sent to indicate that the editor should not be replaced by some other page.
    A 204 response is cacheable by default (an ETag header is included in such a response).`
    static statusCode: number = 204;
    static shortMessage: string = "Successfull, No Content in response served";
    constructor(message: string) {
        super(message)
    }
}

export class ResetContent205 extends StatusCode {
    static statusMessage: string = `The HTTP 205 Reset Content response status tells the client to reset the document view,
     so for example to clear the content of a form, reset a canvas state, or to refresh the UI.`
    static statusCode: number = 205;
    static shortMessage: string = "Successfull, Reset Content"
    constructor(message: string) {
        super(message)
    }
}



