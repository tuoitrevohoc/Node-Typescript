/// <reference path="../typings/index.d.ts" />

import * as express from "express"
import 'reflect-metadata'

// application class
export class Application {

    // list of class
    modules: [Function]

    // instance of objects
    instances: any = {}

    // register list of modules
    register(modules: [Function]) {
        this.modules = modules
    }

    // find a module by its name
    getModuleByName(name: string) {
        var result = null

        for (var item of this.modules) {
            console.log(item["name"] + " -- " + name)
            if (item["name"] === name) {
                result = item
            }
        }

        return result
    }

    // instantiate a modules
    instantiate(theModule: Function) {
        // if the modules is not instantiate
        if (this.instances[theModule["name"]] === undefined) {
            var paramTypes = Reflect.getMetadata("design:paramtypes", theModule)
            var params = []

            if (paramTypes != null) {
                for (var paramType of paramTypes) {
                    var moduleFunction = this.getModuleByName(paramType.name)   

                    if (moduleFunction != null) {
                        params.push(this.instantiate(moduleFunction))
                    } else {
                        console.log("Couldn't instantiate class " + theModule + ". Unresolved dependencies " + paramType)
                        return null
                    }
                }    
            }

            var instance = Object.create(theModule.prototype)

            theModule.apply(instance, params)
            this.instances[theModule["name"]] = instance
        }

        return this.instances[theModule["name"]]
    }

    // start the application
    start(port: number) {
        var app = express()
        app.use(express.static("wwwroot"))

        for (var mod of this.modules) {
            
            var theModule = this.instantiate(mod)
            
            if (mod.prototype._decorators !== undefined) {
                for (var item of mod.prototype._decorators) {
                    item.callBack(app, theModule, item.method, item.data)
                }
            }
        }
        
        app.listen(port, () => {
            console.log("Application started")
        })
    }
}