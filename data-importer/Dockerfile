FROM ubuntu:latest
WORKDIR /data
RUN apt update
RUN apt upgrade -y
RUN apt install -y httpie
COPY . .
RUN chmod +x test.sh
CMD ["./test.sh"]
