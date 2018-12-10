FROM python:3.7

ENV PYTHONUNBUFFERED 1

WORKDIR /app

ADD sensehel /app/sensehel

ADD manage.py /app

ADD requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["./manage.py", "migrate"]

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]