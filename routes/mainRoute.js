const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//below route is used to detect the sentiment from the sentence

/**
 * @swagger
 * /sentiment/{query}:
 *    get:
 *      description: Enter a sentence to determine if it is positive, negative, or neutral including confidence scores.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response 
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
 router.get('/sentiment/:query', controller.getSentimentResult);

 //below route is used to detect the entities from the sentence

/**
 * @swagger
 * /entities/{query}:
 *    get:
 *      description: Enter any sentence to recognize the entities in it
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response 
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
 router.get('/entities/:query', controller.getEntityRecognition);

 //below route is used to detect the keyphrases from the sentence

/**
 * @swagger
 * /keyphrases/{query}:
 *    get:
 *      description: Enter a sentence to extract key phrases 
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response 
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
 router.get('/keyphrases/:query', controller.getKeyPhraseResult);

//below route is used to detect the language used being used in a sentence

 /**
 * @swagger
 * /detectlanguage/{query}:
 *    get:
 *      description: Enter any sentence using any language, this API will return the language used
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Got response 
 *          500:
 *              description: Error
 *      parameters:
 *          - name: query
 *            in: path
 *            required: true
 *            type: string
 *
 */
 router.get('/detectlanguage/:query', controller.getLanguages);

module.exports = router;
