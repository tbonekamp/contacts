import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useData } from '../../context/DataContext';
import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import Navbar from '../Navbar/Navbar';
import Page from '../Page/Page';

import styles from './ContactForm.module.css';

const ContactForm = () => {
    
    const { id } = useParams();
    const history = useHistory();

    const data = useData();

    let jsonData = {
        firstname:'',
        lastname:'',
        status:'private',
        email:'',
        phone:'',
        street:'',
        postcode:'',
        city:''
    };

    if(id && data[id]) {
        jsonData = data[id];
    }

    const {handleChange, values, handleSubmit, errors, isSubmitting} = useForm(jsonData);

    let navItems = {
        left: <Button click={()=>history.push((id) ? '/card/'+id : '/')}>Cancel</Button>,
        center: (id) ? <div>Edit</div> : <div>New</div>,
        right: <Button disabled={isSubmitting} click={handleSubmit}>Save</Button>
      }

    let page = (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <input
                    type='text'
                    name='firstname'
                    placeholder='First name'
                    value={values.firstname}
                    className={errors.firstname && styles.error}
                    onChange={handleChange}
                /> 
                {errors.firstname && <div className={styles.error}>{errors.firstname}</div>}
            </div>
            <div>
                <input
                    type='text'
                    name='lastname'
                    placeholder='Last name'
                    value={values.lastname}
                    className={errors.lastname && styles.error}
                    onChange={handleChange}
                /> 
                {errors.lastname && <div className={styles.error}>{errors.lastname}</div>}
            </div>
            <div className={styles.selectContainer}>
                <select
                    name="status"
                    value={values.status}
                    onChange={handleChange}>
                    <option value="private">private</option>
                    <option value="work">work</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={values.email}
                    onChange={handleChange}
                    className={errors.email && styles.error}
                /> 
                {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
            <div>
                <input
                    type='text'
                    name='phone'
                    placeholder='Phone'
                    value={values.phone}
                    onChange={handleChange}
                    className={errors.phone && styles.error}
                /> 
                {errors.phone && <div className={styles.error}>{errors.phone}</div>}
            </div>
            <div>
                <input
                    type='text'
                    name='street'
                    placeholder='Street'
                    value={values.street}
                    onChange={handleChange}
                    className={errors.street && styles.error}
                /> 
                {errors.street && <div className={styles.error}>{errors.street}</div>}
            </div>
            <div>
                <input
                    type='text'
                    name='postcode'
                    placeholder='Postcode'
                    value={values.postcode}
                    onChange={handleChange}
                    className={errors.postcode && styles.error}
                /> 
                {errors.postcode && <div className={styles.error}>{errors.postcode}</div>}
            </div>
            <div>
                <input
                    type='text'
                    name='city'
                    placeholder='City'
                    value={values.city}
                    onChange={handleChange}
                    className={errors.city && styles.error}
                /> 
                {errors.city && <div className={styles.error}>{errors.city}</div>}
            </div>
        </form>
    );

    if(id && !data[id]) {
        navItems = {
            left: <Button click={()=>history.push('/')}>Back</Button>,
            center: <div>Error</div>,
            right: null
        }
        page = <div>Invalid request</div>;
    }

    return(
        <React.Fragment>
            <Navbar {...navItems} />
            <Page>{page}</Page>
        </React.Fragment>
    );
}

export default ContactForm;