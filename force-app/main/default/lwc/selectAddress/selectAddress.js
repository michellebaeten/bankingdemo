/**
 * Created by apaterson on 01/06/2020.

 https://www.jitendrazaa.com/blog/salesforce/point-and-click/use-lightning-web-components-in-flow/
 */

import {LightningElement, track, api} from 'lwc';
import {FlowAttributeChangeEvent, FlowNavigationNextEvent} from 'lightning/flowSupport';
import searchAddress from '@salesforce/apex/AddressLookupService.searchAddress';
/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 350;

export default class SelectAddress extends LightningElement {

    @track data;
    searchKey='';
    error;

    @api availableActions = [];
    @track _addressLine1;
    @track _addressLine2;
    @track _addressLine3;
    @track _city;
    @track _state;
    @track _country;
    @track _zip;
    @track _showManualAddress;
    @track _countryCode;

    hideResults = false;

    connectedCallback() {
      //  console.log('Inside connectedCallback and value of countryCode is ' + this._countryCode);
    }

    handleKeyChange(event) {

        console.log('Inside handleKeyChange and value of countryCode is ' + this.countryCode);
        // Debouncing this method: Do not actually invoke the Apex call as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {

            console.log('Current serachKey is ' + this.searchKey);
            if (this.searchKey=='') {
                console.log('Search Key is empty, so clear address');
                this.addressLine1 ='';

            }
            let country = this._countryCode;
            console.log('CountryCode is ' + country);
            this.hideResults = false;
            searchAddress({ searchKey , country})
                .then((result) => {
                    console.log('result back was ' + result);

                    let resultJSON = JSON.parse(result);

                    console.log('resultJSON is ' , resultJSON);
                    console.log('resultJSON is ' , resultJSON.length + ' elements');
                    this.data = resultJSON;

                    this.error = undefined;
                })
                .catch((error) => {
                   // this.searchKey = '';
                    console.log('error occurred = ' , error);
                    this.error = error;
                    this.data = undefined;
                });
        }, DELAY);
    }

    set addressLine1(val) {
        this._addressLine1 = val;
    }

    set addressLine2(val) {
        this._addressLine2 = val;
    }
    set addressLine3(val) {
        this._addressLine3 = val;
    }

    set city(val) {
        this.city = val;
    }

    set state(val) {
        this.state = val;
    }

    set country(val) {
        this.country = val;
    }

    set zip(val) {
        this.zip = val;
    }

    set showManualAddress(val) {
        this._showManualAddress = val;
    }

    set countryCode(val) {
        console.log('Inside set country code and val is ' + val);
        this._countryCode = val;
    }

    @api
    get addressLine1() {
        return this._addressLine1;
    }

    @api
    get addressLine2() {
        return this._addressLine2;
    }

    @api
    get addressLine3() {
        return this._addressLine3;
    }

    @api
    get city() {
        return this._city;
    }

    @api
    get state() {
        return this._state;
    }

    @api
    get country() {
        return this._country;
    }

    @api
    get zip() {
        return this._zip;
    }

    @api
    get showManualAddress() {
        return this._showManualAddress;
    }

    @api
    get countryCode() {
        return this._countryCode;
    }

    notEmpty(val) {

        if (val!=undefined && val!='undefined' && val!='' && val.trim()!='') {
            return true;
        }
        return false;
    }
    @api
    validate() {
        console.log('Inside validate ');
        if (this.notEmpty(this._addressLine1)  /*&& this.notEmpty(this._state)*/ && this.notEmpty(this._zip) /*&& this.notEmpty(this._country)*/) {
            console.log(' validate passed');
            return {isValid:true};
        }

        return {
            isValid: false,
            errorMessage: 'Please select a valid address'

        };
    }

    get showValidMessage() {
console.log('Inside showValidMessage');
        return (this.validate().isValid) ;

    }

    handleNext(event) {
        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }

    handleSelectAddress(event) {
        console.log('Inside handleSelectAddress');
        let selectedAddressS = event.detail;
        console.log('selectedAddress as string is ' + selectedAddressS);
        let selectedAddress = JSON.parse(selectedAddressS);
        console.log('and as JSON is ' , selectedAddress);
        this._addressLine1 = (selectedAddress.address.houseNumber || '') + ' ' + (selectedAddress.address.street || '');
        this._city = selectedAddress.address.city;
        this._state = selectedAddress.address.state;
        this._country = selectedAddress.address.countryName;
        this._zip = selectedAddress.address.postalCode;
        console.log('selectedAddress is ', selectedAddress);

        console.log('addressLine1 is ' , this._addressLine1);

        this.searchKey = selectedAddress.address.label;
        this.hideResults = true;
    }


    showManualAddressEntry() {
        this._showManualAddress = true;
    }


    get shouldIShowResults() {

        if (this.data && !this.hideResults) {
            return true;
        }
        return false;
    }

    get shouldIShowManualAddress() {

        return this._showManualAddress;
    }

    get shouldIShowField() {

let result = this._countryCode==undefined || this._countryCode=='';
        console.log('checking showfield and flipped for now due to issue ' + result);
        return result;
    }
}