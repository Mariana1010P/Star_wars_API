import { ICharacter } from "../interface/ICharacter";
import { CharacterModel } from "../models/Character.model";


const addCharacter = async (pizza: ICharacter) => {
    const characterCreated = await CharacterModel.create(pizza);
    console.log(characterCreated);
    return characterCreated;
}


const getCharacterList = async () => {
    try {
        const character = await CharacterModel.find();
        return character;
    } catch (error) {
        throw error;
    }
}

const findCharacterById = async (id: string) => {
    try {
        const character = await CharacterModel.findOne({_id: id });
        return character;
    } catch (error) {
        throw error;
    }
}


const findCharacterByName = async (name: string) => {
    try {
        const character = await CharacterModel.find({ name: { $regex: name, $options: 'i' } });
        console.log(character);
        console.log(name)
        return character;
    } catch (error) {
        console.error('Error in findCharacterByName:', error);
        throw error; 
    }
}

const deleteCharacterById = async (id: string) => {
    try {
        const result = await CharacterModel.deleteOne({ _id: id });
        
        if (result.deletedCount === 1) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {  
        throw error;
    }
}


const updateCharacter = async (characterId: string, updatedCharacterData: any) => {
    try {
    
    await CharacterModel.findByIdAndUpdate(characterId, updatedCharacterData)
    } catch (error) {
        console.error('Error al actualizar la character:', error)
        throw error
    }
}

const getPaginatedDocuments = async (currentPage:number, itemsPerPage:number) => {
    try {
       
        const skip = (currentPage - 1) * itemsPerPage;
        const documents = await CharacterModel.find().skip(skip).limit(itemsPerPage);
        return documents;
    } catch (error) {
      throw new Error('Error fetching paginated documents');
    }
  }

export {addCharacter, getCharacterList, findCharacterById, findCharacterByName, deleteCharacterById, updateCharacter, getPaginatedDocuments}