/*
* Runs in terminal as java GProfilerAPI.java
export JAVA_HOME=/usr/share/java
export PATH=$PATH:$JAVA_HOME/bin
export JSON_JAVA=/home/benjamin/Documents/CS/json
export CLASSPATH=$CLASSPATH:$JSON_JAVA/json-simple-1.1.1.jar:.

*/

//package net.javaguides.network;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.InputStream;
import java.io.DataOutputStream;
import org.json.simple.parser.JSONParser;
import java.util.ArrayList;
import org.json.simple.*;
import java.util.Iterator;
import java.util.Set;

public class GProfilerAPI {

    /*
     * This method sends a request to G:GOSt, and receives A gene-ontology result
     * @param list of gene objects
     */
    public static void getRequest(ArrayList<Gene> geneSet) throws Exception {
        // Build url search string
        String urly = "https://biit.cs.ut.ee/gprofiler/api/gost/profile/";
        URL obj = new URL(urly);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        System.out.println("***SENDING G:GOSt API CALL***");

        // Build gene search string
        String searchGenes = "";
        for (int i = 0; i < geneSet.size(); i++) {
            Gene currGene = geneSet.get(i);
            String currGeneName = currGene.getGeneName();

            if (i != geneSet.size() - 1) {
                searchGenes = searchGenes + "\"" + currGeneName + "\"" + ",";
            } else { // no comma if last gene
                searchGenes = searchGenes + "\"" + currGeneName + "\"";
            }
            
        }


        String searchString = "{ " + 
            "\"organism\": \"hsapiens\", " + 
            "\"query\": [" + searchGenes + "], " +
            "\"sources\": [\"GO\"]" +
            //"\"user_threshold\": 1e-4" +
            //"\"no_evidences\": True" +
            "}";

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type","application/json");


        //Send request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(searchString);
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("Response Code : " + responseCode);

        BufferedReader iny = new BufferedReader(
        new InputStreamReader(con.getInputStream()));
            String output;
            StringBuffer response = new StringBuffer();

            while ((output = iny.readLine()) != null) {
            response.append(output);
            }
            iny.close();

            //printing result from response
            String responseStr = response.toString();
            //System.out.println(responseStr);

            // Response to JSONArray
            JSONObject myObj = null;
            JSONParser parser = new JSONParser();
            Object json = parser.parse(responseStr);
            myObj = (JSONObject) json;

            // Print out search results
            parseJson(myObj);

    }


    /*
     * Parses the search results and prints
     */
    public static void parseJson(JSONObject jsonObject) throws Exception {

        Set<Object> set = jsonObject.keySet();
        Iterator<Object> iterator = set.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            if (jsonObject.get(obj) instanceof JSONArray) {
                System.out.println(obj.toString());
                getArray(jsonObject.get(obj));
            } else {
                if (jsonObject.get(obj) instanceof JSONObject) {
                    parseJson((JSONObject) jsonObject.get(obj));
                } else {
                    System.out.println(obj.toString() + "\t"
                            + jsonObject.get(obj));
                }
            }
        }
    }

    /*
     * a nested function, critical for the parseJson function
     */
    public static void getArray(Object object2) throws Exception {

        JSONArray jsonArr = (JSONArray) object2;
    
        for (int k = 0; k < jsonArr.size(); k++) {
    
            if (jsonArr.get(k) instanceof JSONObject) {
                parseJson((JSONObject) jsonArr.get(k));
            } else {
                System.out.println(jsonArr.get(k));
            }
    
        }
    }

    public static void main (String args[]) throws Exception {

        // Testing the API call
        System.out.println("Sending request");

        GProfilerAPI myGProfilerCaller = new GProfilerAPI();

        Gene g1 = new Gene("CASQ2", "origin1", 2);
        Gene g2 = new Gene("DMD", "origin2", 2);
        Gene g3 = new Gene("name3", "origin3", 2);
        ArrayList<Gene> myGenes = new ArrayList<Gene>();
        myGenes.add(g1);
        myGenes.add(g2);
        //myGenes.add(g3)
        myGProfilerCaller.getRequest(myGenes);
    }
}
