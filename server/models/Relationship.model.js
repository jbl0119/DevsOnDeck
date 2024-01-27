const mongoose = request('mongoose');

const devLanguageSchema = new mongoose.Schema({
    developerId:{
        type:Schema.Type.ObjectId,
        ref: 'Developer',
    },

    languageId:{
        type:Schema.Type.ObjectId,
        ref: 'Language',
    },

    frameworkId:{
        type : Schema.Types.ObjectId,
        ref:'Framework',
    }
});

const DevLanguage = mongoose.model('DevLanguage',devLanguageSchema) ;

module.exports = DevLanguage;