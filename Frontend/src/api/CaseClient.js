import BaseClass from "../util/baseClass";
import axios from 'axios'

xport default class CaseClient extends BaseClass {

    constructor(props = {}){
        super();
        const methodsToBind = ['clientLoaded', 'getExample', 'createExample'];
        this.bindClassMethods(methodsToBind, this);
        this.props = props;
        this.clientLoaded(axios);

        }
         clientLoaded(client) {
             this.client = client;
             if (this.props.hasOwnProperty("onReady")){
                 this.props.onReady();
             }
         }
             async getExample(id, errorCallback) {
                 try {
                     const response = await this.client.get(`/example/${id}`);
                     return response.data;
                 } catch (error) {
                     this.handleError("getConcert", error, errorCallback)
                 }
             }
             async createExample(name, errorCallback) {
                     try {
                         const response = await this.client.post(`example`, {
                             name: name
                         });
                         return response.data;
                     } catch (error) {
                         this.handleError("createExample", error, errorCallback);
                     }
                 }
handleError(method, error, errorCallback) {
        console.error(method + " failed - " + error);
        if (error.response.data.message !== undefined) {
            console.error(error.response.data.message);
        }
        if (errorCallback) {
            errorCallback(method + " failed - " + error);
        }
    }
}