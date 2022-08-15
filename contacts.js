const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const contactsPath = './db/contacts.json';

module.exports = {
  listContacts: async function () {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    return contacts;
  },

  getContactById: async function (contactId) {
    const contacts = await this.listContacts();
    const contact = contacts.find(({ id }) => id === contactId.toString());
    if (!contact) return `Don't find contact with contactId = ${contactId} `;
    return console.log(`Contact:`, contact);
  },

  addContact: async function ({ name, email, phone }) {
    const contacts = await this.listContacts();
    const id = crypto.randomUUID();
    const updatedContacts = [...contacts, { id, name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return console.log('Success');
  },

  removeContact: async function (contactId) {
    const contacts = await this.listContacts();
    const updatedContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return console.log('Success');
  },
};