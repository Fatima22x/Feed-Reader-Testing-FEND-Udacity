/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is a test suite that contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });



        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined', function() {
          expect(allFeeds.length).not.toBe(0);
            allFeeds.forEach(function(feed){
            expect(feed.url).toBeDefined();
            });

        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('names are defined', function() {
          allFeeds.forEach(function(feed){
          expect(feed.name).toBeDefined();
          });
        });
    });


    /* THis is a test suite named "The menu" */
    describe('The menu', function() {

        /* This is a test that ensures the menu element is
         * hidden by default.
         */

        it('menu is hidden by default', function() {
            expect(document.body.className).toContain('menu-hidden');
        });


        /* This is a test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */

        it('visibility of menu changes when clicked', function() {
            var menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    /* This is a test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test required
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('feed contains at least 1 entry', function() {
          expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });


    /* This is a test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldFeed = document.querySelector('.feed').innerHTML;
        beforeEach(function(done) {
            loadFeed(0, function() {

                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * ( loadFeed() is asynchronous. )
         */



        it('loadFeed changes content when new feed is loaded', function() {
            var newFeed = document.querySelector('.feed').innerHTML;
            expect(oldFeed).not.toBe(newFeed);
        });

    });
}());
