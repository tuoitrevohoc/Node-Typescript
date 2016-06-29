# Node-Typescript

The easiest way to use Node-Express with typescript.

Dependencies Injection provided.

## Start up:

Step 1. Clone the repository

Step 2. Install npm dependencies `npm install`

Step 3. Install typings `typings install`

Step 4. Compile typescript `tsc`

Step 5. Start the server `npm start`

## Create a controller:
Step 1. In controller folder, create a `ControllerClass`
```
import { Component, RequestMapping } from '../../core/annotation'

/// export hello controller
@Component
export class HelloController {

    /// say hello
    @RequestMapping("/sayHello")
    sayHello(request, response) {
        return "Hello World!"
    }
}
```
Step 2. Register the controller in the main application:

```
import { Application } from "./core/app"
import { HelloController } from "./app/controller/hello-controller"

var app = new Application()

app.register([ HelloController ])
app.start(3000)
```

## Create a service and use dependencies injection.

Step 1: Create the service.
```
import { Component } from '../../core/annotation'

@Component
export class HelloService {

    /// say hello
    greeting() {
        return "Hello World"
    }
}
```

Step 2: Register the controller in the main application
```
app.register([ HelloController, HelloService ])
```

Step 3: Inject it into another component:
```
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
```

Happy coding & welcome suggestion!!!


