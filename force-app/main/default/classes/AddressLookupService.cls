public with sharing class AddressLookupService {


    @AuraEnabled(Cacheable=true)
    public static String searchAddress(String searchKey, String country) {

        String key = EncodingUtil.urlEncode(searchKey, 'UTF-8');

        Http http = new Http();
        HttpRequest request = new HttpRequest();
String countryCode = 'GBR';
        if (country!=null && country!='') {
            countryCode = country;
        }

        String url = 'https://discover.search.hereapi.com/v1/' +
                'discover' +
                '?at=51.503952,-0.159990' +
                '&q=' + key +
                '&in=countryCode:' + countryCode + '&apiKey=w596VUX9zItY2kQMgNyHaY-xDBpFOr7LGW_i8j-fi0s';
        request.setEndpoint(url);
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json;charset=UTF-8');

        System.debug('url is ' + url);

        HttpResponse response = http.send(request);

        if (response.getStatusCode() != 200) {
            System.debug('The status code returned was not expected: ' +
                    response.getStatusCode() + ' ' + response.getStatus());
        } else {
            System.debug(response.getBody());

        }
        return response.getBody();
    }
}