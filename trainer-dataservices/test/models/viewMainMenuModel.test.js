
const MainMenu = require('../../app/models/viewMainMenuModel');

test('Maintenance Main Menu returns an Object', () => {
  expect(typeof MainMenu()).toBe('object');
});

test('Maintenenace Main Menu contains a title', () => {
  expect(MainMenu()).toHaveProperty('title');
});

test('Maintenenace Main Menu contains items', () => {
  expect(MainMenu()).toHaveProperty('items');
});


test('Maintenenace Main Menu items is an Object', () => {
  expect(typeof MainMenu().items).toBe('object');
});
