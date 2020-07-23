/**
 * Created by apaterson on 15/06/2020.
 */

import {LightningElement, api} from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';


export default class RenderSelectionsLwc extends LightningElement {

    @api optionsList;
    _selected;
    @api title;
    options;

    connectedCallback() {
        this.produceData();
    }

    produceData() {
        let aOptions = this.optionsList.split('~');
        let options = [];
        for (let optionIndex in aOptions) {

            let option = aOptions[optionIndex];

            let newOption = {"id": option, "label": option, "isSelected": false};
            options.push(newOption);


        }

        this.options = options;

    }

    @api
    get selected() {
        return this._selected;
    }

    set selected(val) {
        this._selected = val;
    }

    selectOption(event) {
        let selectedValue = event.currentTarget.dataset.id;
        this._selected = selectedValue;
        this.updateOptions(selectedValue);

    }

    deselectOption(event) {

        let selectedValue = '';
        this._selected = selectedValue;
        this.updateOptions(selectedValue);

    }

    updateOptions(selectedValue) {
        console.log('selectedValue is ' + selectedValue);
        let aOptions = this.optionsList.split('~');
        let options = [];
        for (let optionIndex in aOptions) {

            let option = aOptions[optionIndex];
            let isSelected = false;
            if (selectedValue == option) {
                console.log('selected');
                isSelected = true;
            } else {
                console.log('Did not select as ' + selectedValue + ' is not ' + option);
            }
            let newOption = {"id": option, "label": option, "isSelected": isSelected};
            options.push(newOption);


        }
console.log('options is now ' , options);
        this.options = options;

        const attributeChangeEvent = new FlowAttributeChangeEvent('selected', this._selected);
        this.dispatchEvent(attributeChangeEvent);

    }

    @api
    validate() {
        console.log('Inside validate ');
        if (this.notEmpty(this.selected)  ) {
            console.log(' validate passed');
            return {isValid:true};
        }

        return {
            isValid: false,
            errorMessage: 'Please select an option'

        };
    }

    notEmpty(val) {

        if (val!=undefined && val!='undefined' && val!='' && val.trim()!='') {
            return true;
        }
        return false;
    }
}