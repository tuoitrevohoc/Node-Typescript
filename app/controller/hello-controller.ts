import { Component, RequestMapping, HttpMethod } from '../../core/annotation'
import { HelloService } from '../service/hello-service'

/// export hello controller
@Component
export class HelloController {

    /// import the hello service as dependencies 
    /// inject hello service 
    constructor(private helloService: HelloService) {
    }

    /// say hello
    @RequestMapping("/sayHello")
    sayHello(request, response) {
        return this.helloService.greeting()
    }
}