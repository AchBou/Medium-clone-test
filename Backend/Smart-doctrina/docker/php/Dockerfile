FROM php:fpm-alpine

RUN docker-php-ext-install pdo_mysql


WORKDIR /var/www


RUN php -version

CMD  php-fpm
EXPOSE 9000
