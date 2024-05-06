## Document Annotation Application with Django and Angular

**Description**

This project implements a document annotation application using Django for the backend and Angular for the frontend. It allows users to annotate text documents with labels and export the annotations in JSON format.

**Features**

* User can input a list of labels
* User can select a label from the list
* User can select a word or sentence from the document
* User can annotate the selected text with the desired label
* Annotations can be exported to a JSON file

**Technologies Used**

* Backend: Django, Django REST Framework
* Frontend: Angular
* Docker: Docker Compose

**Architecture**

The application consists of two main components:

1. **Backend (Django):**
   * Provides an API for the frontend to interact with

2. **Frontend (Angular):**
   * Displays a list of labels
   * Shows the document text and allows user selection
   * Provides a button to assign the chosen label to the selected text
   * Communicates with the backend API to manage labels and annotations
   * Generates JSON file for exporting annotations


**Frontend UI**

**![image](https://github.com/kaiedhazem/AnnotateDocuments/assets/59137622/37e890be-8267-4795-b9a3-517bc9c32508)
**

**JSON Export**

When the user clicks the "Submit" button, the application generates a JSON file containing the annotations. The JSON file is saved in the `uploads` directory.

**Dockerfile**

The `Dockerfile` for the backend and frontend services are provided in the repository. These Dockerfiles specify the necessary steps to build the application images.


**Getting Started**

To get started with the project, follow these steps:

1. Clone the repository
2. Install Docker and Docker Compose
3. build the docker files (frontend+backend)
4. get in the frontend directory (cd frontend)
5. Run `docker-compose up` to start the backend and frontend services ( make sure of the images names )
6. Access the application in your web browser: http://localhost:4200 (replace with the appropriate port if necessary)

**Additional Notes**

* For more detailed instructions on using the application, refer to the project documentation.
* The application can be further customized and extended by adding new features or modifying the existing ones.
* For production deployment, consider using a more robust deployment setup such as Kubernetes.

**Happy annotating!**
