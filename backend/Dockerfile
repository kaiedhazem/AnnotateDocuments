FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install dependencies (replace with your actual package names)
RUN pip install django gunicorn && pip install django-cors-headers

# Copy your Django project
COPY . .

# Expose the port where Django is running (usually 8000)
EXPOSE 8000

# Run the Gunicorn server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
