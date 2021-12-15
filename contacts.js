const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const uuid = require('uuid');

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, 'db', 'contacts.json'),
    'utf8',
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await readContent();
};

const getContactById = async contactId => {
  const contacts = await readContent();
  const [contact] = contacts.filter(contact => contact.id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await readContent();
  const contactsForRemove = contacts.find(contact => contact.id == contactId);
  if (contactsForRemove) {
    const contactsNew = contacts.filter(
      contact => contact !== contactsForRemove,
    );
    await fs.writeFile(
      path.join(__dirname, 'db', 'contacts.json'),
      JSON.stringify(contactsNew, null, 2),
    );
    return contactsForRemove;
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  );
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
