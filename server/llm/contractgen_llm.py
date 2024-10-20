from transformers import pipeline
import google.generativeai as genai
import os

async def generate_solidity(context, dropdown_dict, features):
    print("HELLO))))))))))))))))")
    threshold=0.3
    questions = {
    "name": "What is the name of the contract?",
    "ID": "What is the ID of the contract or object?",
    "Status": "What is the status of the transaction?",
    "Description": "What is the description of the object or contract?",
    "symbol": "What is the symbol of the NFT?",
    "client_address": "What is the client address?",
    }
    
    # Initialize the question-answering pipeline with the DistilBERT model
    question_answerer = pipeline("question-answering", model="distilbert/distilbert-base-cased-distilled-squad")

    # Function to extract answers with confidence filtering and string matching
    def extract_data(questions, context, dropdown_dict, features, threshold=0.3):
        extracted_data = {}
        for key, question in questions.items():
            result = question_answerer(question=question, context=context)
            answer = result['answer']
            score = result['score']
            
            # Confidence score threshold check
            if score > threshold and answer in context and answer != "":
                extracted_data[key] = answer
            else:
                extracted_data[key] = None  # Indicating data is missing and will be provided through dropdowns

        for key in extracted_data:
            if key not in dropdown_dict:
                dropdown_dict[key] = extracted_data[key]
                
        for key in features:
            if key not in dropdown_dict:
                dropdown_dict[key] = features[key]
        
        return dropdown_dict

    # Extracting data from the user query
    contract_data = extract_data(context, dropdown_dict, features)
    print(contract_data)

    # Function to convert dictionary to a string
    def dict_to_string(data):
        result = ""
        for key, value in data.items():
            if isinstance(value, dict):  # If the value is another dictionary, recursively convert it
                value_str = dict_to_string(value)
            elif isinstance(value, list):  # If the value is a list, handle it separately
                value_str = ', '.join([str(item) if not isinstance(item, dict) else dict_to_string(item) for item in value])
            else:
                value_str = str(value)
            result += f"{key}: {value_str}, "
        
        # Remove the trailing comma and space
        return result[:-2]

    # Convert the dictionary to a string
    result_string = dict_to_string(contract_data)



    # Google Gemini AI configuration
    api_key = ""
    genai.configure(api_key=api_key)

    # Initialize the model
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    # Create the prompt string for the Gemini model
    prompt_string1 = f"""
    My task is to generate Solidity code for a smart contract based on the following user-input data: {result_string}. 
    1. Provide a detailed, section-by-section explanation of what each part of the contract does. Focus on clarity so the user can easily understand the contract's structure and functionality.
    2. Include key components like variables, functions, and events, and explain how they interact.
    3. Do not give the code. 

    Begin with the explanation, followed by the full code.
    """
    prompt_string2 = f"""
    My task is to generate Solidity code for a smart contract based on the following user-input data: {result_string}.
    1. Provide the complete solidity code in a well-formatted manner.
    """

    # Generate content from the model
    response_preview = model.generate_content([prompt_string1])
    response_code = model.generate_content([prompt_string2])

    return_dict = {"Preview": response_preview, "Code": response_code}
    print(return_dict)
    return return_dict
