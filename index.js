const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);

    case 'get':
      return await contacts.getContactById(id);

    case 'add':
      return contacts.addContact({ name, email, phone });

    case 'remove':
      return contacts.removeContact(id);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction(argv);

const start = async argv => {
  try {
    await invokeAction(argv);
  } catch (err) {
    console.log(err.message);
  }
};
start(argv);