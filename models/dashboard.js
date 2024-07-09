import { model, Schema } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const dashboardSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'user', required: true},
    userProfile: {
        profilePicture: {type: String},
        location: {type: String},
        maritalStatus: {type: String, enum: ['single', 'married', 'prefer-not-to-say']},
        sex: {type: String, enum: ['male', 'female']},
        bio: {type: String},
        about: {type: String},
        dateOfBirth: {type: Date},
        contact: {type: String},
        resume: {type: String},
        spokenLanguages: [{type: String}]
    },
    socials: {
        github: {type: String},
        linkedln: {type: String},
        twitter: {type: String}
    },
    skills: [{
        name: {type: String},
        levelOfProfiency: {type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert']}
    }],
    experience: [{
        companyName: {type:String},
        role: {type: String},
        skills: {type: String},
        responsibility: {type: String},
        location: {type: String},
        startDate: {type: String},
        endDate: {type: String}
    }],
    education: [{
        schoolName: {type:String},
        location: {type: String},
        location: {type: String},
        qualification: {type: String},
        grade: {type: String},
        startDate: {type: String},
        endDate: {type: String}
    }],
    achievements: [{
        awards: {type:String},
        description: {type: String},
        image: {type: String},
        date: {type: String},
        nameOfInstitution: {type: String}
    }],
    projects: [{
        projectName: {type:String},
        program: {type: String},
        contributors: {type: String},
        skills: {type: String},
        link: {type: String},
        nameOfInstitution: {type: String},
        startDate: {type: String},
        endDate: {type: String}
    }],
    volunteering: [{
        organization: {type:String},
        description: {type: String},
        skills: {type: String},
        responsibility: {type: String},
        location: {type: String},
        startDate: {type: String},
        endDate: {type: String},
        role: {type: String},
        projectName: {type: String}
    }]
})

dashboardSchema.plugin(toJSON)

export const DashboardModel = model('dashboard', dashboardSchema)
