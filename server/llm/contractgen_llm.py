from transformers import pipeline
import google.generativeai as genai
from typing import Dict, Any
import os
from dotenv import load_dotenv

class SmartContractGenerator:
    """A class to generate Solidity smart contracts based on user input."""
    
    def __init__(self):
        # Load environment variables
        load_dotenv()
        
        # Question mappings for contract fields
        self.questions = {
            "name": "What is the name of the contract?",
            "ID": "What is the ID of the contract or object?",
            "Status": "What is the status of the transaction?",
            "Description": "What is the description of the object or contract?",
            "symbol": "What is the symbol of the NFT?",
            "client_address": "What is the client address?"
        }
        
        # Initialize NLP pipeline
        self.question_answerer = pipeline(
            "question-answering",
            model="distilbert/distilbert-base-cased-distilled-squad"
        )
        
        # Initialize Gemini AI
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    def extract_data(self, context: str, dropdown_dict: Dict[str, Any], 
                     features: Dict[str, Any], threshold: float = 0.3) -> Dict[str, Any]:
        """
        Extract data from context using NLP and combine with dropdown and feature data.
        
        Args:
            context: Input text to analyze
            dropdown_dict: Dictionary of dropdown values
            features: Dictionary of feature values
            threshold: Confidence threshold for NLP answers
            
        Returns:
            Combined dictionary of extracted data
        """
        extracted_data = {}
        
        # Extract answers from context using NLP
        for key, question in self.questions.items():
            result = self.question_answerer(question=question, context=context)
            answer = result['answer']
            score = result['score']
            
            extracted_data[key] = answer if score > threshold and answer in context and answer != "" else None

        # Combine with dropdown and feature data
        final_data = {**extracted_data, **dropdown_dict, **features}
        return {k: v for k, v in final_data.items() if v is not None}

    @staticmethod
    def dict_to_string(data: Dict[str, Any]) -> str:
        """Convert nested dictionary to string representation."""
        parts = []
        for key, value in data.items():
            if isinstance(value, dict):
                value_str = SmartContractGenerator.dict_to_string(value)
            elif isinstance(value, list):
                value_str = ', '.join(str(item) if not isinstance(item, dict) 
                                    else SmartContractGenerator.dict_to_string(item) 
                                    for item in value)
            else:
                value_str = str(value)
            parts.append(f"{key}: {value_str}")
        return ', '.join(parts)

    async def generate_solidity(self, context: str, dropdown_dict: Dict[str, Any], 
                                 features: Dict[str, Any]) -> Dict[str, str]:
        """
        Generate Solidity smart contract code and explanation.
        
        Args:
            context: Input text context
            dropdown_dict: Dictionary of dropdown values
            features: Dictionary of feature values
            
        Returns:
            Dictionary containing contract preview and code
        """
        # Extract and format data
        contract_data = self.extract_data(context, dropdown_dict, features)
        data_string = self.dict_to_string(contract_data)
        
        # Generate prompts
        preview_prompt = f"""
        My task is to generate Solidity code for a smart contract based on the following user-input data: {data_string}. 
        1. Provide a detailed, section-by-section explanation of what each part of the contract does. Focus on clarity so the user can easily understand the contract's structure and functionality.
        2. Include key components like variables, functions, and events, and explain how they interact.
        3. Do not give the code. 

        Begin with the explanation, followed by the full code.
        """
        
        code_prompt = f"""
        My task is to generate Solidity code for a smart contract based on the following user-input data: {data_string}.
        1. Provide the complete solidity code in a well-formatted manner.
        """
        
        # Generate content
        try:
            preview_response = self.model.generate_content([preview_prompt])
            code_response = self.model.generate_content([code_prompt])
            
            return {
                "Preview": preview_response.text,
                "Code": code_response.text
            }
        except Exception as e:
            return {
                "error": f"Error generating contract: {str(e)}"
            }
