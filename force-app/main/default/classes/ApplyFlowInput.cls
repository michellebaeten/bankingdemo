/**
 * Created by apaterson on 17/06/2020.
 */

public with sharing class ApplyFlowInput {

        @AuraEnabled
        public String firstName {get;set;}

        @AuraEnabled
        public String middleName {get;set;}

        @AuraEnabled
        public String lastName {get;set;}

        @AuraEnabled
        public String email {get;set;}

        @AuraEnabled
        public String phone {get;set;}

        @AuraEnabled
        public String password {get;set;}
    }