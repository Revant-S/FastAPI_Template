import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContractConfig: React.FC = () => {
    const initialValues = {
        ContractName: "",
        contractSymbol: "",
        contractDesc: "",
    }



  const navigate = useNavigate();
  
  const validationSchema = Yup.object().shape({
    contractName: Yup.string().required(),
    contractSymbol: Yup.string().required(),
    contractDesc: Yup.string().required(),
  });

  console.log(ErrorMessage);
  
  const onSubmit = (data: any) => {
    console.log(data)
    navigate('/create-contract')
  }
 
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Smart Contract configuration</h1>
     
    
           
            <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema} 
      > 
         <Form className=" w-[400px] space-y-4 bg-white shadow-lg rounded-lg p-6">
         <h2 className="text-2xl font-bold mb-4">Basic Setup</h2>
              
                <label htmlFor="contractName" className="block font-medium">
                  Contract Name
                </label>
                <Field
                  type="text"
                  name="contractName"
                 
                  className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Contract Name"
                  required
                />
             

          
                <label htmlFor="contractSymbol" className="block font-medium">
                  Symbol
                </label>
                <Field
                  type="text"
                  name="contractSymbol"
                 
                  className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Contract Symbol"
                  required
                />
        
         
                <label htmlFor="contractSymbol" className="block font-medium">
                  Description
                </label>
                <Field
                  type="text"
                  name="contractDesc"
                 
                  className="w-full h-32 p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Contract Description"
                  required
                />
           <ErrorMessage name="name" component="div" className="error" />
              <button
          type='submit'
        className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
         // Replace with actual path
      >
        Next
      </button>
          </Form>
         
          </Formik>
         
      </div>
     
   
  );
};

export default ContractConfig;
