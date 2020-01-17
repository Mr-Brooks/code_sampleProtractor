/**
 * @author 
 * 
 * This is a proposed solution for use case #3
 * in the technical assessment for ncl.
 */
//Structured as Jasmine script for reporting
describe('NCL Protractor Demo', function() {
    //Disable for non-angular web apps
    browser.waitForAngularEnabled = false;

    //Creates browser webdriver instance
    driveHolder = browser.driver;

    var fs = require("fs");

    //Creates browser instance 
    //Used for a user action in the last test
    //userSim = browser;

    
    function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

    it('Navigate to webpage', function() {

        //Navigates to website
        driveHolder.get('https://www.ncl.com/');

        //To allow page to load
        driveHolder.sleep(10000)

        //Take Screenshot
        driveHolder.takeScreenshot().then((png) => {
            writeScreenShot(png, 'nclMainPage.png');
        });

    });

    it('Select Shore Excursions from Dropdown', function(){

        //Select "Explore" dropdown
        driveHolder.findElement(by.xpath('/html/body/header/section[3]/div/nav/div/div/div/div/div[1]/div/ul/li[2]/div/a')).click();

        //Take Screenshot
        driveHolder.takeScreenshot().then((png) => {
            writeScreenShot(png, 'ExploreDropdown.png');
        });

        //Press the "Shore Excursions" menu option
        driveHolder.findElement(by.xpath('/html/body/header/section[3]/div/nav/div/div/div/div/div[1]/div/ul/li[2]/div/div/div/div[2]/ul/li[6]/a')).click();
        
        //Allow page to load
        browser.driver.sleep(1000)
        
        //Take Screenshot
        driveHolder.takeScreenshot().then((png) => {
            writeScreenShot(png, 'ShoreExcursionPage.png');
        });
        

    });

    it('Find Shore Excursions', function(){
        //Force Navigation to Shore Excursions page
        //Should be commented out or removed once navigation can be performed by
        //selecting "Shore Excursions" from the drop-down
        //driveHolder.get('https://www.ncl.com/shore-excursions')

        //Click on the "Find Excursions" Button to load results page
        driveHolder.findElement(by.xpath('//*[@id="page-shore-excursions"]/div/div[1]/div[2]/div/div/div[2]/div[2]/div/button')).click();
        
        //Allow page to load
        driveHolder.sleep(1000);

        //Take Screenshot
        driveHolder.takeScreenshot().then((png) => {
            writeScreenShot(png, 'ShoreExcursions.png');
        });

    });

    it('Query Shore Excursions', function(){
        //Modify query for $0-$30 Excursions
        //Ideally, would manipulate slider using chained mouse actions
        driveHolder.get('https://www.ncl.com/shore-excursions/search?sort=searchWeight&perPage=12&priceRange=0+30');
        
        //Allow page to load
        driveHolder.sleep(1000);

        //Take Screenshot
        driveHolder.takeScreenshot().then((png) => {
            writeScreenShot(png, 'ShoreExcursionQuery.png');
        });
        
        //Expecting results element to appear with total number of results
        //Needs to ensure results are correctly priced at $30 & under
        expect(driveHolder.findElement(by.xpath('/html/body/div[2]/section/div/div[1]/section/div[2]/aside/div/div[4]/ul[2]/li[3]/div/div/div[1]/span[2]')).getText()).toBe('$0-$30');

        
        //Scroll until object is in view for visual evidence
        //Snippet derives from https://stackoverflow.com/questions/3401343/scroll-element-into-view-with-selenium
        var tempElement = driveHolder.findElement(by.xpath('/html/body/div[2]/section/div/div[1]/section/div[2]/aside/div/div[4]/ul[2]/li[3]/div/div/div[1]/span[2]'));
        browser.executeScript("arguments[0].scrollIntoView(true);", tempElement);
        //Thread.sleep(500);

        //Take Screenshot
        driveHolder.takeScreenshot().then((png) => {
            writeScreenShot(png, 'ShoreExcursionQueryProof.png');
        });

    });
  });