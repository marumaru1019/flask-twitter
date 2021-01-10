FROM python:3.7
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
SHELL ["/bin/bash", "-c"]
COPY . .
CMD ["python", "app.py"]