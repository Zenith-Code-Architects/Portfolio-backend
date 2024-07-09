import Joi from "joi";

export const userProfileschema = Joi.object({
    userProfile: {
        profilePicture: Joi.string().required(),
        location: Joi.string().required(),
        maritalStatus: Joi.string(),
        sex: Joi.string().required(),
        bio: Joi.string().required(),
        about: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        contact: Joi.string().required(),
        resume: Joi.string().required(),
        spokenLanguages: Joi.string()
    },

    socials: {
        github: Joi.string().required(),
        linkedln: Joi.string().required(),
        twitter: Joi.string()
    },

    skills: {
        name:Joi.string().required(),
        levelOfProfiency:Joi.string().required(),
    },

    experience:{
        companyName:Joi.string().required(),
        role: Joi.string().required(),
        skills: Joi.string().required(),
        responsibility:Joi.string().required(),
        location: Joi.string().required(),
        startDate:Joi.string().required(),
        endDate:Joi.string()
    },
    education:{
        schoolName:Joi.string().required(),
        location:Joi.string().required(),
        location:Joi.string().required(),
        qualification:Joi.string().required(),
        grade:Joi.string(),
        startDate:Joi.string().required(),
        endDate:Joi.string()
    },
    achievements:{
        awards:Joi.string(),
        description:Joi.string(),
        image:Joi.string(),
        date:Joi.string(),
        nameOfInstitution:Joi.string()
    },
    projects:{
        projectName:Joi.string().required(),
        program:Joi.string().required(),
        contributors:Joi.string().required(),
        skills:Joi.string().required(),
        link:Joi.string().required(),
        nameOfInstitution:Joi.string().required(),
        startDate:Joi.string().required(),
        endDate:Joi.string()
    },
    volunteering:{
        organization:Joi.string(),
        description:Joi.string(),
        skills:Joi.string(),
        responsibility:Joi.string(),
        location:Joi.string(),
        startDate:Joi.string(),
        endDate:Joi.string(),
        role:Joi.string(),
        projectName:Joi.string()
    }
})