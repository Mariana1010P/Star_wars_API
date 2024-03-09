import { Schema, model } from "mongoose";

const ICharacter = new Schema({
    name: {type: String, required: true},
    height: {type: String, required: true},
    birth_year: {type: String, required: true},
    gender: {type: String, required: true},
    homeworld: {type: String, required: true},
    films: {type: Array, required: true},
    species: {type: Array, required: true},
    vehicles: {type: Array},
    starships: {type: Array}
}, { 
    timestamps: true,
    versionKey: false
});

const CharacterModel = model('Character', ICharacter)
export {CharacterModel}