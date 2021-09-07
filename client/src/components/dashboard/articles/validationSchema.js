import * as Yup from 'yup';

export const formValues = {
    title:'',
    content:'',
    excerpt:'',
    score:'',
    director:'',
    actors:'',
    status:'draft'
}

export const validation = () =>
    Yup.object({
        title:Yup.string().required('Sorry the title is required'),
        content:Yup.string().required('Sorry the content is required').min(50, 'That is it?...write some more'),
        excerpt:Yup.string().required('Sorry the excerpt is required').max(400, 'Sorry is 400 Max'),
        score:Yup.number().required('Sorry the score is required').min(0, `Can't be less than 0`).max(100,`Cant be more than 100`),
        director:Yup.string().required('Sorry the director is required'),
        actors:Yup.array().required('Sorry must have actors').min(3, 'Minium is 3'),
        status:Yup.string().required('Sorry the status is required')
    })
