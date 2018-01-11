describe('Address Book', function() {
  beforeEach(function() {
    browser.get(browser.baseUrl);
  });

  it('should show an empty contact edit form', function() {
    element(by.id('new-contact-button-router')).click();

    expect(element(by.id('contact-form-first_name')).getText()).toEqual('');
    expect(element(by.id('contact-form-last_name')).getText()).toEqual('');
    expect(element(by.id('contact-form-email')).getText()).toEqual('');
  });

  it('should create a new contact and return to home with list', function(done) {
    element(by.id('new-contact-button-router')).click().then(function() {
      element(by.id('contact-form-first_name')).sendKeys('Paul').then(function() {
        element(by.id('contact-form-last_name')).sendKeys('Rock').then(function() {
          element(by.id('contact-form-email')).sendKeys('paul_rock@email.com').then(function() {
            element(by.id('contact-form-country')).sendKeys('United States').then(function() {
              element(by.id('contact-form-submit-button')).click().then(function() {
                var contacts = element.all(by.css('.contact-item-name'));
                expect(contacts.last().getText()).toContain('Paul Rock');
                done();
              });
            });
          });
        });
      });
    });
  });

  it('should delete from the list and respond NO/YES on the alert', function() {
    var contacts = element.all(by.css('.contact-item'));
    expect(contacts.count()).toEqual(1);

    contacts.first().element(by.css('.contact-item-delete-button')).click();
    expect(contacts.count()).toEqual(1);

    element(by.id('alert-negative-action-button')).click();
    expect(contacts.count()).toEqual(1);

    contacts.first().element(by.css('.contact-item-delete-button')).click();
    expect(contacts.count()).toEqual(1);

    element(by.id('alert-positive-action-button')).click();
    expect(contacts.count()).toEqual(0);
  });
});

