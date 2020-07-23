/**
 * Created by apaterson on 15/06/2020.
 */

({
    doInit : function(component, event, helper) {

        var sObject = component.get('v.sObject');

        var options = [];


        if (sObject=='CustomerType') {
            // need the Provider list
            options=["Yes", "No"];
        } else {
            // need the care types
            options=["Acupuncture", "Audiology", "Dermatology", "Gynaecology", "Podiatry", "Psychiatry", "Radiology"];
        }

        component.set('v.options', options);

    }
})