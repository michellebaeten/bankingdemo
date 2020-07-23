/**
 * Created by apaterson on 17/06/2020.
 */

import {LightningElement, api, track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import createUser from '@salesforce/apex/ApplyCreateUserService.createUserFromLWC';

export default class CreateUserOnLoad extends NavigationMixin(LightningElement) {

    url;
    error;
    _userDetails;

    connectedCallback() {
        console.log('User Details is ', this.userDetails);

        this.createUserAndRedirect();
    }


    @api
    get userDetails() {
        return this._userDetails;
    }

    set userDetails(val) {
        this._userDetails = val;
    }
    createUserAndRedirect() {

        let userDetails = this.userDetails;
        console.log('Inside createUserAndRedirect');

        console.log('UserDetails.firstName is ' + userDetails.firstName);

        createUser({ 'request': userDetails})
            .then((result) => {
                console.log('result back was ' + result);
                this.url = result;



                    this[NavigationMixin.Navigate]({
                        "type": "standard__webPage",
                        "attributes": {
                            "url": this.url
                        }
                    });

                this.error = undefined;
            })
            .catch((error) => {
                // this.searchKey = '';
                console.log('error occurred = ' , error);
                this.error = error;
                this.url = undefined;
            });
    }
}