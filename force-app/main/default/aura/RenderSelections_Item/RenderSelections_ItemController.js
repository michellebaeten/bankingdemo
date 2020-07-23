({
    selectOption : function(component, event, helper) {
        console.log('Inside selectOption');
        var option = component.get('v.option');
        var multi = component.get('v.multiSelect');


        // check current status
        var isSelected = component.get('v.isSelected');

        if (isSelected==true) {
            // need to turn off.
            console.log('Need to turn off option ' + option);
            var selected = component.get('v.selectedOptions');

            var newSelected = [];
            for (var i=0; i<selected.length;i++) {

                if (selected[i]!=option) {
                    newSelected.push(selected[i]);
                }
            }
            component.set('v.selectedOptions', newSelected);

        } else {

            console.log('Need to toggle on. multi is set to' + multi);
            if (multi==true) {

                console.log('This is a multi set up, check whether already there');

                var selected = component.get('v.selectedOptions');
                if ((selected.join(',')).indexOf(option)!=-1) {
                    // already exists
                    //
                    //

                } else {
                    console.log('Going to add as not in list')   ;
                    if (selected=='') {
                        selected = [option];

                    } else {

                        selected.push(option);
                    }

                    component.set('v.selectedOptions', selected);

                }



            } else {
                console.log('Working in single mode, so set');
                component.set('v.selectedOptions', option);
            }

        }
    },

    selectedOptionsChange: function(component, event, helper) {
        console.log('Inside selectedOptionsChange');

        console.log("numItems has changed");
        console.log("old value: " + event.getParam("oldValue"));
        console.log("current value: " + event.getParam("value"));

        var selected = component.get('v.selectedOptions');

        var option = component.get('v.option');

        if ((selected.join(',')).indexOf(option)!=-1) {

            console.log('Option ' + option + ' is selected');
            component.set('v.isSelected', true);
        } else {
            console.log(option + ' NOT selected');
            component.set('v.isSelected', false);
        }
    }
})