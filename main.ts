import { Application } from "./core/app"
import { HelloController } from "./app/controller/hello-controller"
import { HelloService } from "./app/service/hello-service"

var app = new Application()

app.register([ HelloController, HelloService ])
app.start(3000)