export default function validation(values) {
    let errors = {};

    // firstname
    if(values.firstname.trim() === '') {
        errors.firstname = 'Missing first name';
    }

    // lastname
    if(values.lastname.trim() === '') {
        errors.lastname = 'Missing last name';
    }

    // email
    if(values.email.trim() === '') {
        errors.email = 'Missing email';
    } else {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(!pattern.test( values.email )) {
            errors.email = 'Invalid email address';
        }
    }

    // phone
    if(values.phone.trim() === '') {
        errors.phone = 'Missing phone';
    } 

    return errors;
}