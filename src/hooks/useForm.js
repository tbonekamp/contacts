import {useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDataUpdate } from '../context/DataContext';
import validation from '../utilities/validation';

const useForm = (incomingData) => {

    const { id } = useParams();
    const toggleData = useDataUpdate();
    const history = useHistory();
    const [values,setValues] = useState(incomingData);
    const [errors,setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        setValues({
            ...values, [name]: value
        });
        setErrors({
            ...errors, [name]: null
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        setIsSubmitting(true);

        const errorsObj = validation(values);
        setErrors({
            ...errors, ...errorsObj
        });

        if(Object.keys(errorsObj).length>0) {
            setIsSubmitting(false);
        } else {
            if(id) {
                toggleData('edit',values,id);
                history.push("/card/"+id);
            } else {
               toggleData('add',values);
               history.push("/");
            }
        }
    }

    return {handleChange, values, handleSubmit, errors, isSubmitting}
}

export default useForm;