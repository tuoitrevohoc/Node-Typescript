import { Component } from '../../core/annotation'

/**
 *  the user service class for handling data 
 */
@Component
export class HelloService {

    constructor() {
    }

    /// say hello
    greeting() {
        return "Hello World"
    }
}