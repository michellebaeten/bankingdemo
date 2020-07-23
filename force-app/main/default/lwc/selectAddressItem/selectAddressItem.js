/**
 * Created by apaterson on 01/06/2020.
 */

import {LightningElement, api} from 'lwc';

export default class SelectAddressItem extends LightningElement {

    iconname="standard:address";
    @api item;


    handleSelect(event){
        event.preventDefault();

        let item = JSON.stringify(this.item);

        console.log('selectedRecord is ' , item);
        const selectedRecord = new CustomEvent(
            "selectaddress",
            {
                detail : item
            }
        );

        /* fire the event to be handled on the Parent Component */
        this.dispatchEvent(selectedRecord);
    }

    get shouldIShowRow() {

        if (this.item.resultType=='place') {
            return false;
        }
        return true;
    }
}