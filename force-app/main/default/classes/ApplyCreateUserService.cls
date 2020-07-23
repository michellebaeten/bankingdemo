/**
 * Created by apaterson on 16/06/2020.
 */

public class ApplyCreateUserService {


    @AuraEnabled
    public static String fakeCreate() {
        ApplyFlowInput request = new ApplyFlowInput();

        request.firstName = 'frst1';
        request.password = 'demo12341';
        request.email = 'apaterson+test4@salesforce.com';
        request.lastName = 'person';
        request.phone = 'phone';

        return createUserFromLWC(request);

    }
    @AuraEnabled
    public static String createUserFromLWC(ApplyFlowInput request) {

System.debug('Inside createUserFromLWC');

        System.debug('request firstname is ' + request.firstName);
        PageReference pr = doCreateUser(request);
        if (pr!=null) {
            String url = pr.getUrl();
            System.debug('url is ' + url);
            return url;
        }
        return '';
    }


     private static PageReference doCreateUser(ApplyFlowInput request) {
        Account act = new Account(
                FirstName = request.firstName,
                LastName =request.lastName,
                PersonEmail = request.email,

                RecordTypeId ='0124K000000ARaNQAW'
        );
        Database.insert(act);

        System.debug('Created Account');



        String orgId = UserInfo.getOrganizationId();
        String dateString = String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','');
        Integer randomInt = Integer.valueOf(math.rint(math.random()*1000000));
        String uniqueName = orgId + dateString + randomInt;
        if(uniqueName.length()>51)
        {
            uniqueName=uniqueName.substring(0,51);
        }

        String nickname = act.FirstName.substring(0, 3) + Integer.valueof(math.random()*10000);

System.debug('about to create user with nickname of ' + nickname);
        User user1 = new User(
                UserName = act.PersonEmail,
                FirstName = act.FirstName,
                LastName = act.LastName,
                Alias = nickname,
                email = act.PersonEmail,
                ProfileId = '00e4K000000UB2N',
                EmailEncodingKey = 'UTF-8',
                CommunityNickname = nickname,
                TimeZoneSidKey = 'Europe/London',
                LocaleSidKey ='en_GB',
                LanguageLocaleKey = 'en_US'
        );

        String userId;
        String password = request.password;
        userId = Site.createExternalUser(user1, act.Id, password, true);

         System.debug('Created ExternalUser');
       return Site.login (act.PersonEmail, request.password,  '/customerportal/s/depositapplication');

    }




}