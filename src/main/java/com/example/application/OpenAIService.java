package com.example.application;

import org.apache.hc.client5.http.fluent.Request;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.json.JSONObject;

public class OpenAIService {
    private static final String NODE_API_URL = "http://localhost:3001/query";

    public static String getAIResponse(String query) {
        try {
            JSONObject body = new JSONObject();
            body.put("query", query);

            // Send POST request to Node.js backend
            String response = Request.post(NODE_API_URL)
                    .addHeader("Content-Type", "application/json")
                    .body(new StringEntity(body.toString()))
                    .execute()
                    .returnContent()
                    .asString();

            // Parse the JSON response
            JSONObject jsonResponse = new JSONObject(response);
            return jsonResponse.getString("response");
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: Unable to process the request.";
        }
    }
}
