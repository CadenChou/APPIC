@@ -0,0 +1,131 @@
import java.net.http.HttpRequest;
import java.net.http.HttpClient;
import java.net.URI;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import java.util.ArrayList;
import java.net.http.HttpRequest.BodyPublishers;

/*
* This class will send a get request to the Human Protein Atlas API
*
* - ben needs to also get ensebl  id, then use that as input for the getImage method
* @author Benjamin Ahn
* @version 1.0
*
* Notes:
export JAVA_HOME=/usr/share/java
export PATH=$PATH:$JAVA_HOME/bin
export JSON_JAVA=/home/benjamin/Documents/CS/json
export CLASSPATH=$CLASSPATH:$JSON_JAVA/json-simple-1.1.1.jar:.
* cd to/folder/with/java/file
* compile with: javac HumanProteinAtlastAPI.java
* run with: java HumanProteinAtlasAPI.java
*/


public class HumanProteinAtlasAPI_xml {

    // Build api request caller
    public String resultsFormat; //ie. json

    /* Constructor will build searchURI
    * @param resultsFormat use "json"
    */
    public HumanProteinAtlasAPI_xml(String resultsFormat) {
        this.resultsFormat = resultsFormat;
    }

    /* Make a get request to Human Atlas Protein
    * @param geneName name of the gene to search
    * @param searchCharateristics characteristics of gene from the search. Look at
    * https://www.proteinatlas.org/about/help/dataaccess for parameters and search characteristics
    * @return array data from search results
    */
    public Object getRequest(String geneName, String searchCharateristics) throws Exception {
        // Build search URI
        String searchURI = "https://www.proteinatlas.org/api/search_download.php?search="
            + geneName + "&format="
            + this.resultsFormat + "&columns="
            + searchCharateristics + "&compress=no";

        // Send api request
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
             .uri(URI.create(searchURI))
             .build();

        // Synchronous response as String
        System.out.println("***MAKING API CALL TO HUMAN PROTEIN ATLAS ***");
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        String responseStr = response.body();

        // Response to JSONArray
        JSONParser parser = new JSONParser();
        Object json = parser.parse(responseStr);

        System.out.println(json);

        return json;
    }

    /*
    * Conducts another API call to get the first histology image
    */ 
    public String getImages(String ensembleID) throws Exception {
        // Build search string
        String searchURI = "https://www.proteinatlas.org/"
            + ensembleID + ".xml";

        // Send api request
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
             .uri(URI.create(searchURI))
             .build();

        // Synchronous response as String
        System.out.println("***MAKING API CALL TO HUMAN PROTEIN ATLAS - XML ***");
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        String responseStr = response.body();

        // Parse and look for images
        String[] myStrings = responseStr.split("<");

        int i = 1;
        boolean foundImage = false;
        String imageURL = "blank";
        while (foundImage == false) {
            String currString = myStrings[i];
            
            if (currString.substring(0, 8).equals("imageUrl")) {
                // Access image
                String[] imageSplit = currString.split(">");
                imageURL = imageSplit[1];

                foundImage = true;
            }

            i++;
        }

        return imageURL;

    }

    public static void main(String args[]) throws Exception {
        // test the API call

        // Initiate a Human Protein Atlas API caller object
        HumanProteinAtlasAPI_xml myHPACaller = new HumanProteinAtlasAPI_xml("json");

        // Make a request for a gene
        //JSONArray p53Array = myHPACaller.getRequest("p53", "g");
        Object gfapArray = myHPACaller.getRequest("GFAP", "g,eg");
        String urlString = myHPACaller.getImages("ENSG00000134057");

        System.out.println(gfapArray);
        System.out.println(urlString);
    }
}