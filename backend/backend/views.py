from django.http import JsonResponse
import os
import json

from backend import settings

def generate_json(request):
    try:
        # ... previous code for GET request handling (if any) ...
        if request.method == 'POST':
            # Handle POST request data
            array_data = request.body.decode('utf-8')
            data = json.loads(array_data)
   
            uploads_dir = os.path.join(settings.BASE_DIR, "uploads")
            os.makedirs(uploads_dir, exist_ok=True)

            # Generate an iterative filename with a numeric suffix
            file_num = 1
            filename = f"data_{file_num}.json"
            while os.path.exists(os.path.join(uploads_dir, filename)):
                file_num += 1
                filename = f"data_{file_num}.json"

            # Create and write the JSON file
            filepath = os.path.join(uploads_dir, filename)
            with open(filepath, "w") as outfile:
                json.dump(data, outfile, indent=4)

            return JsonResponse({'filename': data}, status=200)
        else:
            # Handle other request methods (optional)
            return JsonResponse({'message': 'Mauvaise méthode de requête'}, status=405)  # For non-POST requests
    except Exception as e:
        response = {
            'message': 'Erreur lors de la concaténation du tableau',
            'error': str(e)
        }
        return JsonResponse(response, status=500)

def generate_csrf_token(request):
     if request.method == 'GET':
         # Generate and return CSRF token (for testing only)
         from django.middleware.csrf import get_token
         csrf_token = get_token(request)
         return JsonResponse({'csrf_token': csrf_token})
     else:
         return JsonResponse({'message': 'Mauvaise méthode de requête'}, status=405)
