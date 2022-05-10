const mongoose = require('mongoose');
const match = require('../utils/regex');

const productSchema = mongoose.Schema({
  title: { 
      type: String,
      required: 'Ce champs est obligatoire.',
      validate: {
        validator: function(v) {
            return match.regex.noSpecialCharsWithPonctuation.test(v)
        },
        message: props => `"${props.value}" n'est pas une chaîne de caractère valide (uniquement des lettres avec ou sans accent(s), espace(s) et caractères spéciaux (&, ., -, !, ', : et ,) sont acceptés)`,
      },
  },
  textContent: { 
      type: String,
      required: 'Ce champs est obligatoire.',
      validate: {
        validator: function(v) {
            return match.regex.noSpecialCharsWithPonctuation.test(v)
        },
        message: props => `"${props.value}" n'est pas une chaîne de caractère valide (uniquement des lettres avec ou sans accent(s), espace(s) et caractères spéciaux (&, ., -, !, ', : et ,) sont acceptés).`,
      },
  },
  productInfo: { 
      type: String,
      required: false,
      validate: {
        validator: function(v) {
            return /^[a-zA-Z '\-àäâéêëùûüç!]*$/i.test(v)
        },
        message: props => `"${props.value}" n'est pas une chaîne de caractère valide (uniquement des lettres avec ou sans accent(s), espace(s) et caractères spéciaux (&, ., -, !, ', : et ,) sont acceptés).`,
      },
  },
  img: {
      type: String,
      required: 'Ce champs est obligatoire.',
  },
  price: {
      type: Number,
      required: 'Ce champs est obligatoire.',
      validate: {
        validator: function(v) {
            return match.regex.price.test(v)
        },
        message: props => `"${props.value}" n'est pas un prix valide (ex: 15, ou: 151.99 sont valides). ${props.value}`,
      },
  },
  categories: {
      type: String,
      required: 'Ce champs est obligatoire.',
      validate: {
        validator: function(v) {
            return match.regex.noSpecialChars.test(v)
        },
        message: props => `"${props.value}" n'est pas une chaîne de caractère valide (uniquement des lettres avec ou sans accent(s), espace(s). Les caractères spéciaux, sauf la virgule, ne sont pas autorisés.`,
      },
  },
  options: {
    taille: {
        type: Array,
        required: 'Ce champs est obligatoire.'
    },
    couleur: {
        type: Array,
        required: 'Ce champs est obligatoire.'
    },
  },
  state: { 
    published: {
      type: Boolean,
      default: false
    },
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
