
// http method
export class HttpMethod {
    static Get = "get"
    static Post = "post"
    static Delete = "delete"
    static Put = "put"
    static Head = "head"
}

// export function 
export function RequestMapping(route: string, method: string = "get") {
    return function (target: any, name: string) {
        target._decorators = (target._decorators || [])
        target._decorators.push({ 
            target: target,
            data: { route: route, method: method },
            method: name,
            callBack: function (app, target, method, data) {
                app[data.method](data.route, function (request, response){
                    var value  = target[method](request, response)
                    if (value !== undefined) {
                        response.set("Content-Type", "application/json")
                        response.send(JSON.stringify(value))
                    }
                })
            }
        })
    }
}

export function Component(target: any) {

}