import validation from './validation';

describe('Contact form validation', () => {
    let values = {
     'firstname':'',
     'lastname':'',
     'email':'',
     'phone':''
    };

    it('returns error for missing firstname', () => {
        const errors = validation(values);
        expect(errors).toHaveProperty('firstname');
    });
    it('returns error for missing lastname', () => {
        const errors = validation(values);
        expect(errors).toHaveProperty('lastname');
    });
    it('returns error for missing email', () => {
        const errors = validation(values);
        expect(errors).toHaveProperty('email');
    });
    it('returns error for invalid email', () => {
        values.email = 'invalid';
        const errors = validation(values);
        expect(errors).toHaveProperty('email');
    })
    it('returns error for missing phone', () => {
        const errors = validation(values);
        expect(errors).toHaveProperty('phone');
    });
    it('returns no error for missing street', () => {
        const errors = validation(values);
        expect(errors).not.toHaveProperty('street');
    });
    it('returns no error for missing postcode', () => {
        const errors = validation(values);
        expect(errors).not.toHaveProperty('postcode');
    });
    it('returns no error for missing city', () => {
        const errors = validation(values);
        expect(errors).not.toHaveProperty('city');
    });
});