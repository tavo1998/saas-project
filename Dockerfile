FROM python:3.8-slim-buster
WORKDIR /flask-app
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
ENV FLASK_ENV = development
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
