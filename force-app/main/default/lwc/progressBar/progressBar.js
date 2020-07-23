/**
 * Created by apaterson on 02/06/2020.
 */

import {LightningElement, api} from 'lwc';

export default class ProgressBar extends LightningElement {

    @api currentStage;
    @api activeStages;
    @api title;
    @api description;
    @api progressType;


    get shouldIShowInfo() {
        if (this.description==undefined || this.description=='') {
            return false;
        }
        return true;
    }
}