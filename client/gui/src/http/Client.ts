
const BACKEND_QUERY = () =>  `http://${window.location.hostname}:${window.location.port === "3000" ? "81" : window.location.port}/api`;

export class HTTPClient {
    public static GET(path: String) {
        return HTTPClient.genericQuery(path, "GET");
    }

    public static POST(path: String, body: any) {
        return HTTPClient.genericQuery(path, "POST", body)
    }

    private static genericQuery(path: String, method: string, body?: any) {
        if (body)
        {
            return fetch(BACKEND_QUERY() + path, {
              method: method,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body)
            });
        }
        else
        {
            return fetch(BACKEND_QUERY() + path, {
                method: method,
                body: body ? body : undefined
            });
        }
    }
}
