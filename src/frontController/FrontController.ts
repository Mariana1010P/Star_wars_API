import express from "express"
import {addCharacter, getCharacterList, findCharacterById, findCharacterByName,
     deleteCharacterById, updateCharacter, getPaginatedDocuments} from "../controller/Character.controller"
import { CharacterModel } from "../models/Character.model";

const routerCharacter = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Character:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del personaje (Character's name)
 *         height: 
 *            type: string
 *            description: Altura del personaje (Character's height)
 *         birth_year: 
 *            type: string
 *            description: Año de nacimiento del personaje (Character's birth year)
 *         gender: 
 *            type: string
 *            description: Género del personaje (Character's gender)
 *         homeworld: 
 *            type: string
 *            description: Mundo natal del personaje (Character's homeworld)
 *         films: 
 *            type: array
 *            description: Películas en las que aparece el personaje (Movies featuring the character) 
 *         species: 
 *            type: array
 *            description: Especies a las que pertenece el personaje (Species to which the character belongs) 
 *         vehicles: 
 *            type: array
 *            description: Vehículos utilizados por el personaje (Vehicles used by the character) 
 *         starships: 
 *            type: array
 *            description: Naves espaciales utilizadas por el personaje (Starships used by the character)
 *    
 *       requiered:
 *        - name
 *        - height
 *        - birth_year
 *        - gender
 *        - homeworld
 *        - films
 *        - species
 *          
 *       example:
 *          name: "Luke Skywalker"
 *          height: "1.72 m"
 *          birth_year: "19 BBY"
 *          gender: "Male"
 *          homeworld: "Tatooine"
 *          films:
 *            - "A New Hope"
 *            - "The Empire Strikes Back"
 *            - "Return of the Jedi"
 *          species:
 *            - "Human"
 *          vehicles:
 *            - "X-34 Landspeeder"
 *          starships:
 *            - "X-wing Starfighter"
 */

/**
 * @swagger
 * /api/characters:
 *   post:
 *     summary: Crear un nuevo personaje (Create a new character)
 *     tags: 
 *       - Character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 * 
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve el personaje agregado.
 *         content:
 *           application/json:
 *             example:
 *               response: 
 *                 name: "Leia Organa"
 *                 
 *       '400':
 *         description: La solicitud es incorrecta o el cuerpo es nulo.
 *         
 *       '500':
 *         description: Error interno del servidor.
 *         
 */


routerCharacter.post('/characters', async (req, res) => {
    try {
      const newCharacter = await addCharacter(req.body);
      res.status(200).json(newCharacter);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


/**.get('/api/characters_pag', async (req, res) => {
  try {
      const { pageNumber, pageSize } = req.query

      const characterList = await CharacterModel.find()
          .limit(Number(pageSize))
          .skip(Number(pageSize) * (Number(pageNumber) - 1))
          .sort({ _id: 1 }) // Orden ascendente por _id

      res.status(200).json(characterList)
  } catch (error) {
      console.error('Error al obtener personajes:', error)
      res.status(500).json({ error: 'Error al obtener personajes' })
  }
})
 * @swagger
 * /api/all_characters:
 *   get:
 *     summary: lista de personajes (character list)
 *     tags: 
 *       - Character
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve la lista de personajes.
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Character'
 *       '400':
 *         description: La solicitud es incorrecta o el cuerpo es nulo.
 *         
 *       '500':
 *         description: Error interno del servidor.
 */

routerCharacter.get('/all_characters', async (req, res) => {
    try {
      const characters = await getCharacterList();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


/**
 * @swagger
 * /api/character/{id}:
 *   get:
 *     summary: Busca un personaje (Find a character)
 *     tags: 
 *       - Character
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         requiered: true  
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve el personaje.
 *         content:
 *           application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Character'
 *       '404':
 *          description: Character noy found
 *         
 */

routerCharacter.get('/character/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const character = await findCharacterById(id);
      if (character) {
        res.json(character);
      } else {
        res.status(404).json({ error: 'Character not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});  


/**
 * @swagger
 * /api/filter_character/{name}:
 *   get:
 *     summary: Busca un personaje (Find a Character)
 *     tags: 
 *       - Character
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *          type: string
 *         requiered: true  
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve el personaje.
 *         content:
 *           application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Character'
 *       '404':
 *          description: Character noy found
 *         
 */

routerCharacter.get('/filter_character/:name', async (req, res) => {
  try {
      const name = req.params.name
      if (!name) {
          return res.status(400).send({ message: 'The "name" parameter is required in the query.' })
      }

      const character = await findCharacterByName(name)
      console.log('Controller:', character)

      if (character) {
          res.status(200).send(character)
      } else {
          res.status(404).send({ message: 'Character not found' })
      }
  } catch (error) {
      console.error('Error in character endpoint:', error)
      res.status(500).json({ error: 'Internal Server Error' })
  }
})


/**
 * @swagger
 * /api/delete_character/{id}:
 *   delete:
 *     summary: Elimina un personaje (Delete a character)
 *     tags: 
 *       - Character
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *          type: string
 *         requiered: true  
 *     responses:
 *       '200':
 *         description: Operación exitosa. Elimina un personaje.
 *         content:
 *           application/json:
 *              schema:
 *                items:
 *                  $ref: '#/components/schemas/Character'
 *       '404':
 *          description: Character noy found
 *         
 */

routerCharacter.delete('/delete_character/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const isDeleted = await deleteCharacterById(id);
      if (isDeleted) {
        res.json({ message: 'Character deleted successfully' });
      } else {
        res.status(404).json({ error: 'Character not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
/**
 * @swagger
 * components:
 *   schemas:
 *     CharacterInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del personaje (Character's name)
 *         height: 
 *            type: string
 *            description: Altura del personaje (Character's height)
 *         birth_year: 
 *            type: string
 *            description: Año de nacimiento del personaje (Character's birth year)
 *         gender: 
 *            type: string
 *            description: Género del personaje (Character's gender)
 *         homeworld: 
 *            type: string
 *            description: Mundo natal del personaje (Character's homeworld)
 *         films: 
 *            type: array
 *            description: Películas en las que aparece el personaje (Movies featuring the character) 
 *         species: 
 *            type: array
 *            description: Especies a las que pertenece el personaje (Species to which the character belongs) 
 *         vehicles: 
 *            type: array
 *            description: Vehículos utilizados por el personaje (Vehicles used by the character) 
 *         starships: 
 *            type: array
 *            description: Naves espaciales utilizadas por el personaje (Starships used by the character)     
 *       example:
 *          name: "Luke Skywalker"
 *          height: "1.72 m"
 *          birth_year: "19 BBY"
 *          gender: "Male"
 *          homeworld: "Tatooine"
 *          films:
 *            - "A New Hope"
 *            - "The Empire Strikes Back"
 *            - "Return of the Jedi"
 *          species:
 *            - "Human"
 *          vehicles:
 *            - "X-34 Landspeeder"
 *          starships:
 *            - "X-wing Starfighter"
 */

/**
 * @swagger
 * /api/update_character/{id}:
 *   put:
 *     summary: Actualiza un personaje existente (Update an existing character)
 *     tags:
 *       - Character
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Character'
 *     responses:
 *       '200':
 *         description: Operación exitosa. Devuelve un personaje actualizad.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       '404':
 *         description: Personaje not found
 */

routerCharacter.put('/update_character/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCharacterData = req.body;
    try {
      await updateCharacter(id, updatedCharacterData);
      res.json({ message: 'Character updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /api/paginated:
 *   get:
 *     summary: Paginación de personajes
 *     description: Obtén una lista paginada de personajes.
 *     tags:
 *       - Character
 *     parameters:
 *       - in: query
 *         name: currentPage
 *         description: Página actual que se desea obtener.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: itemsPerPage
 *         description: Número de elementos por página.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 4
 *     responses:
 *       200:
 *         description: Lista paginada de personajes.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Character'
 *       400:
 *         description: Parámetros de paginación inválidos.
 *       404:
 *         description: No se encontraron personajes.
 *       500:
 *         description: Error al obtener la lista de personajes
 */

routerCharacter.get('/paginated', async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage as string) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 4; 
    const documents = await getPaginatedDocuments(currentPage, itemsPerPage);

    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





export {routerCharacter}