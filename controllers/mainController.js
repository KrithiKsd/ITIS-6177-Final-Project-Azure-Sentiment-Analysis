const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");


// This example requires environment variables named "LANGUAGE_KEY" and "LANGUAGE_ENDPOINT" 
//keys are fetching from the system. For the security purpose I am not displaying here
const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;


const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

exports.getSentimentResult = async(req, res) => {

    var paramater=req.params.query;
        console.log("parameters***"+paramater)

        var sentimentObj;
        if(paramater===undefined || paramater===null || paramater===""){
            res.send('Please send the body')
        }else{    
        const sentimentInput = [
            paramater
        ];

        try {
            //retrieving sentiment data from the api
            const sentimentResult = await textAnalyticsClient.analyzeSentiment(sentimentInput);
           
            //parsing sentiment data to display
            sentimentResult.forEach(document => {
                 sentimentObj={
                    id:document.id,
                    document_Sentiment:document.sentiment,
                    scorespositive:document.confidenceScores.positive.toFixed(2),
                    scoresnegative:document.confidenceScores.negative.toFixed(2),
                    scoresneutral:document.confidenceScores.neutral.toFixed(2),
                    sentenceSentiment:document.sentences.length

                }
            
            });
            res.send(200,sentimentObj)
            res.end();

        } catch (e) {
            console.log("If any errors!!!"+e.message);
            res.send(500,e.message); 
        } finally {
            console.log('Sentiment analyzed');
        }
    }

};

exports.getEntityRecognition = async(req, res) => {

    var paramater=req.params.query;

      if(paramater===undefined || paramater===null || paramater===""){
          res.send('Please send the body')
      }else{    
      const entityInput = [
          paramater
      ];

      try{
          const entityResult = await textAnalyticsClient.recognizeEntities(entityInput);
          var entityArray=[];
          entityResult.forEach(document => {
              document.entities.forEach(entity => {
                  //console.log(entity.text);
                  entityArray.push(entity.text);
              });
              res.send(200,'Entity Recognitions:'+entityArray);
          });
          res.end();
      }
      catch(e){
          res.send(500,e.message); 
      }finally {
          console.log('Entities detected');
      }
  }
};

exports.getKeyPhraseResult = async (req, res) => {

    var paramater=req.params.query;

    if(paramater===undefined || paramater===null || paramater===""){
        res.send('Body should not be empty')
    }else{
  
    const keyphraseInput = [
        paramater
    ];

    try {

        //extracting key phrases
        const keyPhraseResult = await textAnalyticsClient.extractKeyPhrases(keyphraseInput);
        //console.log(keyPhraseResult)
        keyPhraseResult.forEach(document => {

            console.log(document.keyPhrases)
            res.send(200,'Key Phrases : '+document.keyPhrases);
            
        });
        
        res.end();

    } catch (e) {
         
         res.send(500,e.message); 
        
    } finally {
        console.log('Key phrases extracted');
    }
  }
};

exports.getLanguages = async (req, res) => {
 
    var paramater=req.params.query;

    if(paramater===undefined || paramater===null || paramater===""){
        res.send('Body should not be empty')
    }else{
    const languageinput = [
        paramater
    ];

    try {
        //fetching the language
        const languageResult = await textAnalyticsClient.detectLanguage(languageinput);
        
        const detectedln=languageResult[0].primaryLanguage.name;
        res.json(200,'The language used is ' + detectedln);    
        
        res.end();

    } catch (e) {
        res.send(500,e.message); 
        
    } finally {
        console.log('Language detected');
    }
}   
};

