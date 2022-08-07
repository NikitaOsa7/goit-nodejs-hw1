const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(precess.argv);

const argv = program.opts();

async function invokeAction({ action, id, email, name, phone }) {
    switch (action) {
        case 'list':
            const contactsList = await contacts.listContacts();
            return console.table(contactsList);
        case 'get':
            return await contacts.getContactsById(id);
        case 'add':
            return contacts.addContact({ name, email, phone });
        case 'remove':
            return contacts.removeContact(id);
        
        default: 
            console.warn('Unknown action type!')
    }
}

const start = async argv => {
    try {
        await invokeAction(argv);
    } catch (error) {
        console.log(error.message);
    }
};


start(argv);