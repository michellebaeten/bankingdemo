/**
 * Created by apaterson on 16/06/2020.
 */

import {LightningElement, api} from 'lwc';
import {FlowAttributeChangeEvent, FlowNavigationNextEvent} from 'lightning/flowSupport';

export default class OnfidoIdCheck extends LightningElement {

    error;
_completed;

@api
get completed() {
    return this._completed;
}

set completed(val) {
    this._completed = val;

}
    markIDAsDone(event) {
        console.log('Inside markIDAsDone');
        this.completed = true;

    }

    @api
    validate() {
        console.log('Inside validate ');
        if (this.completed==true) {
            console.log(' validate passed');
            return {isValid:true};
        }

        return {
            isValid: false,
            errorMessage: 'Please complete ID Validation before continuing'

        };
    }
}