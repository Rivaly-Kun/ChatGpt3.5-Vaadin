package com.example.application.views;

import com.example.application.OpenAIService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("")
public class MainView extends VerticalLayout {
    public MainView() {
        TextField userInput = new TextField("Enter your medical query:");
        Button submitButton = new Button("Get Response");
        TextArea responseArea = new TextArea("AI Response:");
        responseArea.setReadOnly(true);
        responseArea.setWidthFull();

        // Add click listener to button
        submitButton.addClickListener(event -> {
            String query = userInput.getValue();
            if (!query.isBlank()) {
                String response = OpenAIService.getAIResponse(query);
                responseArea.setValue(response);
            } else {
                responseArea.setValue("Please enter a query.");
            }
        });

        // Add components to the layout
        add(userInput, submitButton, responseArea);
    }
}
